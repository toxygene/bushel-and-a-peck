define(function(require) {
    var forEach = require('mout/array/forEach');
    var L = require('leaflet');
    
    return L.Class.extend({
        /**
         * Initialize the trees layer
         *
         * @constructor
         * @param {Variety} variety
         */
        initialize: function(variety) {
            this.layerGroup = L.layerGroup();
            this.variety = variety;
            
            this.onTreesChangeHandler = this.onTreesChange.bind(this);
            
            //variety.trees.subscribe(this.onTreesChangeHandler, null, 'arrayChange');
        },
        /**
         * On add
         *
         * @param {Object} map
         */
        onAdd: function(map) {
            this.layerGroup.addTo(map);
        },
        /**
         * On remove
         */
        onRemove: function(map) {
            map.removeLayer(this.layerGroup);
        },
        /**
         * On trees change handler
         *
         * @param {Object[]} changes
         */
        onTreesChange: function(changes) {
            forEach(changes, function(change) {
                if (change.status == 'added') {
                    this.addLayer(L.marker([change.value.latitude(), change.value.longitude()]));
                }
                
                // TODO handle deletes
            }, this.layerGroup);
        }
    });
});
