define(function(require) {
    var forEach = require('mout/array/forEach');
    var L = require('leaflet');
    var TreesLayer = require('components/TreeVarietiesMap/TreesLayerCopmonent');

    return L.Class.extend({
        initialize: function(varieties) {
            this.controlLayers = L.control.layers(null, null, { collapsed: false });

            this.onVarietiesChangeHandler = this.onVarietiesChange.bind(this);

            varieties.subscribe(this.onVarietiesChangeHandler, null, 'arrayChange');
        },
        onAdd: function(map) {
            this.controlLayers.addTo(map);
        },
        onRemove: function(map) {
            this.controlLayers.removeFrom(map);
        },
        onVarietiesChange: function(changes) {
            forEach(changes, function(change) {
                this.addOverlay(new TreesLayer(change.value.trees), change.value.name);
            }, this.controlLayers);
        }
    });
});
