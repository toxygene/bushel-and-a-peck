define(function(require) {
    "use strict";

    var filter = require('mout/array/filter');
    var forEach = require('mout/array/forEach');
    var L = require('leaflet');
    var pluck = require('mout/array/pluck');
    var TreeMarker = require('components/TreeVarietiesMap/TreeMarker');

    var TreesLayer = L.Class.extend({});

    var proto = TreesLayer.prototype;

    /**
     * Initialize the trees layer
     *
     * @constructor
     * @param {Array[]} trees
     * @param {EditTreePopup} editTreePopup
     */
    proto.initialize = function(trees, editTreePopup) {
        this.layerGroup = L.layerGroup();
        this.trees = trees;
        this.editTreePopup = editTreePopup;

        this.addTreeHandler = this.addTree.bind(this);
        this.onTreesChangeHandler = this.onTreesChange.bind(this);

        this.trees.subscribe(this.onTreesChangeHandler, null, 'arrayChange');
    };

    /**
     * On add
     *
     * @param {Object} map
     */
    proto.onAdd = function(map) {
        this.layerGroup.addTo(map);
    };

    /**
     * On remove
     */
    proto.onRemove = function(map) {
        map.removeLayer(this.layerGroup);
    };

    /**
     *
     */
    proto.addTree = function(tree) {
        this.layerGroup.addLayer(new TreeMarker(tree, this.editTreePopup));
    };

    /**
     * On trees change handler
     *
     * @param {Object[]} changes
     */
    proto.onTreesChange = function(changes) {
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
    };

    return TreesLayer;
});
