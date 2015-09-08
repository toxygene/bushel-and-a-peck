define(function(require) {
    "use strict";

    var filter = require('mout/array/filter');
    var forEach = require('mout/array/forEach');
    var L = require('leaflet');
    var pluck = require('mout/array/pluck');
    var VarietyLayer = require('components/TreeVarietiesMap/VarietyLayer');

    var VarietiesControlLayer = L.Class.extend({});

    var proto = VarietiesControlLayer.prototype;

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
            .currentVarieties //.varieties // todo currentVarieties should be used, but is causing a bug I can't track down
            .subscribe(this.onVarietiesChangeHandler, null, 'arrayChange');
    };

    /**
     * Add a variety to the layers
     *
     * @chainable
     * @param {VarietyViewModel} variety
     */
    proto.addVariety = function(variety) {
        this.layers[variety.id] = new VarietyLayer(this.treeVarieties, variety);
        this.controlLayers.addOverlay(this.layers[variety.id], variety.name);
    };


    /**
     * @param {L.Map} map
     */
    proto.onAdd = function(map) {
        this.map = map;
        this.controlLayers.addTo(map);
    };

    /**
     * @param {L.Map} map
     */
    proto.onRemove = function(map) {
        this.map = null;
        map.removeLayer(this.controlLayers);
    };

    /**
     * Handler for changes to the current varieties handler
     *
     * @param {array} changes
     */
    proto.onVarietiesChange = function(changes) {
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
    };

    /**
     * Remove a variety from the layers
     *
     * @chainable
     * @param {VarietyViewModel} variety
     */
    proto.removeVariety = function(variety) {
        if (this.map && this.map.hasLayer(this.layers[variety.id])) {
            this.map.removeLayer(this.layers[variety.id]);
        }

        this.controlLayers.removeLayer(this.layers[variety.id]);  // TODO this does not call onRemove for the layer!!! Must be done manually!
        delete this.layers[variety.id];

        return this;
    };

    return VarietiesControlLayer;
});
