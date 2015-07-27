define(function(require) {
    var Ajax = require('utils/Ajax');
    var BaseComponent = require('components/BaseComponent');
    var find = require('mout/array/find');
    var forEach = require('mout/array/forEach');
    var inheritPrototype = require('mout/lang/inheritPrototype');
    var ko = require('knockout');
    var L = require('leaflet');
    var Tree = require('models/TreeModel');
    var Variety = require('models/VarietyModel');
    var VarietyLayers = require('components/TreeVarietiesMap/VarietyLayersComponent');
    
    var MapComponent = function(element, options) {
        BaseComponent.call(this, element, options);

        this.varieties = ko.observableArray();
    };
    
    MapComponent.SELECTOR = '.js-map';
    
    var proto = inheritPrototype(MapComponent, BaseComponent);
    
    proto.createChildren = function() {
        this.map = L.map(
            this.$element.get(0),
            {
                center: [this.$element.data('latitude'), this.$element.data('longitude')],
                zoom: this.$element.data('zoom')
            }
        );

        L.tileLayer('https://{s}.tiles.mapbox.com/v3/examples.map-i87786ca/{z}/{x}/{y}.png', {
            attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
        }).addTo(this.map);

        this.varietyLayers = new VarietyLayers(this.varieties);
        this.map.addLayer(this.varietyLayers);

        return this;
    };

    proto.createHandlers = function() {
        this.onVarietiesLoadedHandler = this.onVarietiesLoaded.bind(this);

        return this;
    };

    proto.enable = function() {
        this.loadVarieties();
    };

    proto.loadVarieties = function() {
        var promise = Ajax({
            url: 'api.json'
        });

        promise.done(this.onVarietiesLoadedHandler);
    };

    proto.onVarietiesLoaded = function(result) {
        forEach(result.data, function(varietyData) {
            var variety = new Variety();

            variety.id = varietyData.id;

            variety.name = varietyData.attributes.name;

            this.push(variety);

            forEach(varietyData.relationships.trees.data, function(treeRelationship) {
                var treeData = find(result.included, function(include) {
                    return include.type == 'tree' && include.id == treeRelationship.id
                });
                
                if (!treeData) { // TODO error?
                    return;
                }

                var tree = new Tree();

                tree.id = treeRelationship.id;
                tree.latitude(treeData.latitude);
                tree.longitude(treeData.longitude);

                variety.trees.push(tree);
            });
        }.bind(this.varieties));
    };

    return MapComponent;
});
