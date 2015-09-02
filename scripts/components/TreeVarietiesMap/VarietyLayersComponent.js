define(function(require) {
    "use strict";

    var EditTreePopup = require('components/TreeVarietiesMap/EditTreePopupComponent');
    var forEach = require('mout/array/forEach');
    var L = require('leaflet');
    var pluck = require('mout/array/pluck');
    var TreesLayer = require('components/TreeVarietiesMap/TreesLayerComponent');

    return L.Class.extend({
        initialize: function(varieties) {
            this.controlLayers = L.control.layers(null, null, { collapsed: false });
            this.editTreePopup = new EditTreePopup(varieties);

            this.addVarietyHandler = this.addVariety.bind(this);
            this.onVarietiesChangeHandler = this.onVarietiesChange.bind(this);

            varieties.subscribe(this.onVarietiesChangeHandler, null, 'arrayChange');
        },
        addVariety: function(variety) {
            this.controlLayers
                .addOverlay(new TreesLayer(variety.trees, this.editTreePopup), variety.name);
        },
        onAdd: function(map) {
            this.controlLayers.addTo(map);
        },
        onRemove: function(map) {
            this.controlLayers.removeFrom(map);
        },
        onVarietiesChange: function(changes) {
            forEach(pluck(changes, 'value'), this.addVarietyHandler);
        }
    });
});
