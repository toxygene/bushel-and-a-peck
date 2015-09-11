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
     * @param {VarietiesViewModel} varietiesViewModel
     */
    proto.initialize = function(varietiesViewModel) {
        this.layers = {};

        this.controlLayers = L.control.layers(null, null, { collapsed: false });

        // Handlers
        this.addVarietyHandler = this.addVariety.bind(this);
        this.onVarietiesChangeHandler = this.onVarietiesChange.bind(this);

        // Event listeners
        varietiesViewModel.varieties.subscribe(this.onVarietiesChangeHandler, null, 'arrayChange');
    };

    /**
     * Add a variety to the layers
     *
     * @chainable
     * @param {VarietiesViewModel} variety
     */
    proto.addVariety = function(variety) {
        this.layers[variety.id] = new VarietyLayer(variety);
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

    return VarietiesControlLayer;
});
