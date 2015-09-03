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
     * @param {TreeVarietiesViewModel} treeVarieties
     * @param {Array[]} trees
     */
    proto.initialize = function(treeVarieties, trees) {
        this.markers = {};
        this.trees = trees;
        this.treeVarieties = treeVarieties;

        this.layerGroup = L.layerGroup();

        // Handlers
        this.addTreeHandler = this.addTree.bind(this);
        this.onTreesChangeHandler = this.onTreesChange.bind(this);
        this.removeTreeHandler = this.removeTree.bind(this);

        // Observers
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
        this.markers[tree.id] = new TreeMarker(this.treeVarieties, tree);
        this.layerGroup.addLayer(this.markers[tree.id]);
        return this;
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
            this.removeTreeHandler
        );
    };

    proto.removeTree = function(tree) {
        this.layerGroup.removeLayer(this.markers[tree.id]);
        delete this.markers[tree.id];

        return this;
    };

    return TreesLayer;
});
