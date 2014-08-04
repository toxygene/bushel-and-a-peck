define(function(require) {
    var ko = require('knockout');
    var L = require('leaflet');

    var Tree = function(id, latitude, longitude) {
        this.id = ko.observable(id);
        this.latitude = ko.observable(latitude);
        this.longitude = ko.observable(longitude);

        this.marker = new L.Marker([this.latitude(), this.longitude()]);

        this.latitude.subscribe(function(newValue) {
            this.marker.setLatLng([newValue, this.longitude()]);
            this.marker.update();
        }, this);

        this.longitude.subscribe(function(newValue) {
            this.marker.setLatLng([this.latitude(), newValue]);
            this.marker.update();
        }, this);
    };

    return Tree;
});
