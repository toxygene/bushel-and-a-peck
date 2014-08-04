define(function(require) {
    var ko = require('knockout');
    var L = require('leaflet');
    var map = require('mout/array/map');
    var Tree = require('view-models/Tree');

    var Type = function(m, name, trees) {
        this.map = m;

        this.name = ko.observable(name);
        this.trees = ko.observableArray(map(trees, function(tree) {
            return new Tree(tree.id, tree.latitude, tree.longitude);
        }, this));

        this.visible = ko.observable(true);
        this.visible.subscribe(this.onVisibleChangeHandler);

        this.layer = L.layerGroup(map(this.trees(), function(tree) {
            return tree.marker;
        })).addTo(this.map);
    };

    return Type;
});
