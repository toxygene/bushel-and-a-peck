define(function(require) {
    var AdminMapControls = require('view-models/AdminMapControls');
    var ko = require('knockout');
    var L = require('leaflet');
    var map = require('mout/array/map');
    var Type = require('view-models/Type');
    var unique = require('mout/array/unique');

    var AdminMapComponent = function(data) {
        this.map = L.map('map').setView([44.873571, -91.299130], 16);

        L.tileLayer('https://{s}.tiles.mapbox.com/v3/examples.map-i87786ca/{z}/{x}/{y}.png', {
            attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
        }).addTo(this.map);

        this.map.addControl(new AdminMapControls(this.types));

        this.types = ko.observableArray(map(data.types, function(type) {
            return new Type(this.map, type.name, type.trees);
        }, this));

        this.typeNames = ko.computed({
            owner: this,
            read: function() {
                return unique(map(this.types(), function(type) {
                    return type.name();
                }, this));
            }
        });
    };

    return AdminMapComponent;
});
