define(function(require) {
    var $ = require('jquery');
    var ko = require('knockout');

    var Tree = function(id, type, latitude, longitude) {
        this.id = ko.observable(id);
        this.type = ko.observable(type);
        this.latitude = ko.observable(latitude);
        this.longitude = ko.observable(longitude);

        this.marker = new L.Marker(
            [this.latitude(), this.longitude()],
            {
                title: this.type + " (" + this.latitude() + ',' + this.longitude() + ')'
            }
        );

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
