define(function(require) {
    var Ajax = require('utils/Ajax');
    var BaseComponent = require('components/BaseComponent');
    var find = require('mout/collection/find');
    var forEach = require('mout/collection/forEach');
    var inheritPrototype = require('mout/lang/inheritPrototype');
    var ko = require('knockout');
    var L = require('leaflet');
    var map = require('mout/collection/map');
    var Tree = require('models/TreeModel');
    var Variety = require('models/VarietyModel');
    var VarietyLayers = require('components/TreeVarietiesMap/VarietyLayersComponent');

    /**
     * Map component
     *
     * @constuctor
     * @param {$element} element
     * @param {Object] options
     */
    var MapComponent = function($element, options) {
        BaseComponent.call(this, $element, options);

        this.varieties = ko.observableArray();
    };

    MapComponent.SELECTOR = '.js-map';

    var proto = inheritPrototype(MapComponent, BaseComponent);

    /**
     * Create the map and add the tile and variety layers
     *
     * @chainable
     */
    proto.createChildren = function() {
        this.map = L.map(
            this.$element.get(0),
            {
                center: [this.$element.data('latitude'), this.$element.data('longitude')],
                zoom: this.$element.data('zoom')
            }
        );

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'toxygene.nadn5mm9',
            accessToken: 'pk.eyJ1IjoidG94eWdlbmUiLCJhIjoiRjZQLTBrTSJ9.g8_WRX9WFPs9t5gAdYiaDA'
        }).addTo(this.map);

        this.varietyLayers = new VarietyLayers(this.varieties);
        this.map.addLayer(this.varietyLayers);

        return this;
    };

    /**
     * Create the handlers for the component
     *
     * @chainable
     */
    proto.createHandlers = function() {
        this.onTreesLoadedHandler = this.onTreesLoaded.bind(this);

        return this;
    };

    /**
     * Enable the component
     *
     * @chainable
     */
    proto.enable = function() {
        this.loadTrees();
        
        return this;
    };

    /**
     * Load the trees from the API endpoint
     */
    proto.loadTrees = function() {
        var promise = Ajax({
            cache: false,
            url: 'api.json'
        });

        promise.done(this.onTreesLoadedHandler);
    };
    
    /**
     *
     */
    proto.onTreesLoaded = function(results) {
        forEach(
            map(
                results.included,
                function(variety) {
                    return Variety.build(
                        variety.id,
                        variety.name
                    );
                }
            ),
            this.addVariety.bind(this)
        );

        forEach(
            map(
                results.data,
                function(tree) {
                    return new Tree.build(
                        tree.id,
                        tree.latitude,
                        tree.longitude,
                        find(this.varieties, function(variety) {
                            return variety.id == tree.variety_id;
                        })
                    );
                }
            ),
            this.addTree.bind(this)
        );
    };

    proto.addTree = function(tree) {
        var variety = find(this.varieties, function(variety) {
            return variety == tree.variety();
        });
        
        if (!variety) {
            return;
        }
        
        variety.trees.push(tree);

        tree.variety.subscribe(function(oldVariety) {
            var variety = find(
                this,
                function(variety) {
                    return variety.id == oldVariety.id
                }
            );
            
            if (variety) {
                variety.trees.remove(tree);
            }
        }.bind(this.varieties), null, 'beforeChange');

        tree.variety.subscribe(function(newVariety) {
            var variety = find(
                this,
                function(variety) {
                    return variety.id == newVariety;
                }
            );
            
            if (variety) {
                variety.trees.push(tree);
            }
        });
    };
    
    proto.addVariety = function(variety) {
        this.varieties.push(variety);
    };

    return MapComponent;
});
