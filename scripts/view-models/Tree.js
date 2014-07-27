define(function(require) {
    var ko = require('knockout');

    var Tree = function(feature) {
        this.type = feature.properties.type;
        this.latitude = ko.observable(feature.geometry.coordinates[1]);
        this.longitude = ko.observable(feature.geometry.coordinates[0]);

        this.marker = new L.Marker(
            [this.latitude(), this.longitude()],
            {
                title: this.type + " (" + this.latitude() + ',' + this.longitude() + ')'
            }
        );

        var popupDiv = $('<div data-bind="template: { name: \'tree-popup\' }"></div>').get(0);
        ko.applyBindings(this, popupDiv);
        this.marker.bindPopup(popupDiv);

        this.latitude.subscribe(function(newValue) {
            this.marker.setLatLng([newValue, this.longitude()]);
            this.marker.update();
        }, this);

        this.longitude.subscribe(function(newValue) {
            this.marker.setLatLng([this.latitude(), newValue]);
            this.marker.update();
        }, this);
    };

    Tree.prototype.getMarker = function() {
        return this.marker;
    };

    return Tree;
});
