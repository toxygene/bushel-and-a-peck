define(function(require) {
    var forEach = require('mout/array/forEach');
    var L = require('leaflet');
    
    return L.Class.extend({
        initialize: function(variety) {
            this.layerGroup = L.layerGroup();
            
            this.onTreesChangeHandler = this.onTreesChange.bind(this);
            
            variety.trees.subscribe(this.onTreesChangeHandler, null, 'arrayChange');
        },
        onAdd: function(map) {
            this.layerGroup.addTo(map);
        },
        onRemove: function(map) {
            map.removeLayer(this.layerGroup);
        },
        onTreesChange: function(changes) {
            forEach(changes, function(change) {
                this.addLayer(L.marker([
                    change.value.latitude(),
                    change.value.longitude()
                ]));
            }, this.layerGroup);
        }
    });
});
