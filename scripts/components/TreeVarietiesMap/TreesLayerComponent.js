define(function(require) {
    "use strict";

    var filter = require('mout/array/filter');
    var forEach = require('mout/array/forEach');
    var L = require('leaflet');
    var pluck = require('mout/array/pluck');
    
    return L.Class.extend({
        /**
         * Initialize the trees layer
         *
         * @constructor
         * @param {Array[]} trees
         * @param {Popup} editMarkerPopup
         */
        initialize: function(trees, editMarkerPopup) {
            this.editMarkerPopup = editMarkerPopup;
            this.layerGroup = L.layerGroup();
            this.trees = trees;

            this.addTreeHandler = this.addTree.bind(this);
            this.onTreesChangeHandler = this.onTreesChange.bind(this);

            this.trees.subscribe(this.onTreesChangeHandler, null, 'arrayChange');
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
         *
         */
        addTree: function(tree) {
            var marker = L.marker(
                [tree.latitude(), tree.longitude()],
                {
                    opacity: 0.75
                }
            );

            // this probably leaks memory, right?
            marker.on('click', function() {
                this.editMarkerPopup.setTree(tree);

                marker.bindPopup(this.editMarkerPopup)
                    .openPopup();
            }.bind(this));

            this.layerGroup
                .addLayer(marker);
        },
        /**
         * On trees change handler
         *
         * @param {Object[]} changes
         */
        onTreesChange: function(changes) {
            forEach( // call add tree on each
                pluck( // pluck the value of the change
                    filter( // filter non-added statuses
                        changes,
                        function(change) {
                            return change.status == 'added'
                        }
                    ),
                    'value'
                ),
                this.addTreeHandler
            );

            // TODO handle deletes
        }
    });
});
