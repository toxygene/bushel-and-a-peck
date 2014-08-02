define(function(require) {
    var forEach = require('mout/array/forEach');
    var ko = require('knockout');
    var L = require('leaflet');
    var Tree = require('view-models/Tree');

    ko.bindingHandlers.treeMarkerPopup = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            viewModel.marker.bindPopup(element);
        },
        update: function() {
        }
    };

    var AdminMapComponent = function(data) {
        this.map = L.map('map').setView([44.873571, -91.299130], 16);
        this.onClickRemoveHandler = this.onClickRemove.bind(this);
        this.onTreesChangeHandler = this.onTreesChange.bind(this);
        this.trees = ko.observableArray();

        this.trees.subscribe(this.onTreesChangeHandler, null, 'arrayChange');

        L.tileLayer('https://{s}.tiles.mapbox.com/v3/examples.map-i87786ca/{z}/{x}/{y}.png', {
            attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
        }).addTo(this.map);

        forEach(data.trees, this.addTreeData, this);
    };

    AdminMapComponent.prototype.addTree = function(tree) {
        this.trees.push(tree);
    };

    AdminMapComponent.prototype.addTreeData = function(treeData) {
        this.addTree(new Tree(
            treeData.id,
            treeData.type,
            treeData.latitude,
            treeData.longitude
        ));
    };

    AdminMapComponent.prototype.onClickRemove = function(tree) {
        this.removeTree(tree);
    }

    AdminMapComponent.prototype.onTreesChange = function(changes) {
        forEach(changes, function(change) {
            if (change.status === 'added') {
                change.value.marker.addTo(this.map);
            } else if (change.status === 'deleted') {
                this.map.removeLayer(change.value.marker);
            }
        }, this);
    };

    AdminMapComponent.prototype.removeTree = function(tree) {
        this.trees.remove(tree);
    };

    return AdminMapComponent;
});
