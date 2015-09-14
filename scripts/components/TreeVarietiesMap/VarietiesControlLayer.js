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
     * @param {TreeVarietiesViewModel} treeVarietiesViewModel
     */
    proto.initialize = function(treeVarietiesViewModel) {
        this.layers = {};
        this.treeVarietiesViewModel = treeVarietiesViewModel;

        this.controlLayers = L.control.layers(null, null, { collapsed: false });

        // Handlers
        this.addVarietyHandler = this.addVariety.bind(this);
        this.onVarietiesChangeHandler = this.onVarietiesChange.bind(this);

        // Event listeners
        this.currentVarietiesSubscriber = this.treeVarietiesViewModel.currentVarieties.subscribe(this.onVarietiesChangeHandler, null, 'arrayChange');

        forEach(this.treeVarietiesViewModel.varieties(), this.addVariety);
    };

    proto.destroy = function() {
        this.currentVarietiesSubscriber.dispose();
    };

    /**
     * Add a variety to the layers
     *
     * @chainable
     * @param {VarietyModel} variety
     */
    proto.addVariety = function(variety) {
        this.layers[variety.id()] = new VarietyLayer(this.treeVarietiesViewModel.getTreeVarietyViewModelForVariety(variety));
        this.controlLayers.addOverlay(this.layers[variety.id()], variety.name());
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
