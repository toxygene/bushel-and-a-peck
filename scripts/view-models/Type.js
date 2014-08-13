define(function(require) {
    var forEach = require('mout/array/forEach');
    var ko = require('knockout');
    var L = require('leaflet');
    var map = require('mout/array/map');
    var Tree = require('view-models/Tree');

    var Type = function(m, name, trees) {
        this.map = m;
        this.onChangeTreesHandler = this.onChangeTrees.bind(this);

        this.name = ko.observable(name);
        this.trees = ko.observableArray(map(trees, function(tree) {
            return new Tree(tree.id, tree.latitude, tree.longitude);
        }, this));
        
        this.trees.subscribe(this.onChangeTreesHandler, null, 'arrayChange');

        this.visible = ko.observable(true);
        this.visible.subscribe(this.onVisibleChangeHandler);

        this.layer = L.layerGroup(map(this.trees(), function(tree) {
            return tree.marker;
        }));
    };
    
    Type.prototype.onChangeTrees = function(changes) {
        forEach(changes, function(change) {
            if (change.status === 'added') {
                this.layer.addLayer(change.value.marker);
            } else if (change.status === 'deleted') {
                this.layer.removeLayer(change.value.marker);
            }
        }, this);
    };

    return Type;
});
