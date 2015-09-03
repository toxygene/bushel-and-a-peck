define(function(require) {
    "use strict";

    var filter = require('mout/array/filter');
    var forEach = require('mout/array/forEach');
    var L = require('leaflet');
    var pluck = require('mout/array/pluck');
    var TreesLayer = require('components/TreeVarietiesMap/TreesLayer');

    var VarietyLayers = L.Class.extend({});

    var proto = VarietyLayers.prototype;

    /**
     * Initialize the layer
     *
     * @param {TreeVarietiesViewModel} treeVarieties
     */
    proto.initialize = function(treeVarieties) {
        this.layers = {};
        this.treeVarieties = treeVarieties;

        this.controlLayers = L.control.layers(null, null, { collapsed: false });

        // Handlers
        this.addVarietyHandler = this.addVariety.bind(this);
        this.onVarietiesChangeHandler = this.onVarietiesChange.bind(this);
        this.removeVarietyHandler = this.removeVariety.bind(this);

        // Observers
        this.treeVarieties
            .currentVarieties
            .subscribe(this.onVarietiesChangeHandler, null, 'arrayChange');
    };

    /**
     * Add a variety to the layers
     *
     * @chainable
     * @param {VarietyViewModel} variety
     */
    proto.addVariety = function(variety) {
        this.layers[variety.id] = new TreesLayer(this.treeVarieties, variety.trees);

        this.controlLayers.addOverlay(this.layers[variety.id], variety.name);
    };


    /**
     * @param {L.Map} map
     */
    proto.onAdd = function(map) {
        this.controlLayers.addTo(map);
    };

    /**
     * @param {L.Map} map
     */
    proto.onRemove = function(map) {
        this.controlLayers.removeFrom(map);
    };

    /**
     * Handler for changes to the current varieties handler
     *
     * @param {array} changes
     */
    proto.onVarietiesChange = function(changes) {
        // Call addVariety for any added varieties
        forEach(
            pluck(
                filter(
                    changes,
                    function(change) {
                        return change.status == 'added';
                    }
                ),
                'value'
            ),
            this.addVarietyHandler
        );

        // Call removeVariety for any removed varieties
        forEach(
            pluck(
                filter(
                    changes,
                    function(change) {
                        return change.status == 'deleted';
                    }
                ),
                'value'
            ),
            this.removeVarietyHandler
        );
    };

    /**
     * Remove a variety from the layers
     *
     * @chainable
     * @param {VarietyViewModel} variety
     */
    proto.removeVariety = function(variety) {
        this.controlLayers.removeLayer(this.layers[variety.id]);
        delete this.layers[variety.id];

        return this;
    };

    return VarietyLayers;
});
