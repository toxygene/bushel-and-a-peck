define(function() {
    "use strict";

    var $ = require('jquery');    
    var ko = require('knockout');
    var L = require('leaflet');
    
    var Tree = function(map, id, type, latitude, longitude) {
        this.id = id;
        this.latitude = ko.observable(latitude);
        this.longitude = ko.observable(longitude);
        this.type = ko.observable(type);
        this.map = map;

        this.marker = L.marker([this.latitude(), this.longitude()]);
        this.marker.bindPopup($('#edit').get(0));
        this.show();
    };

    Tree.prototype.hide = function() {
        this.map.removeLayer(this.marker);
        return this;
    };

    Tree.prototype.show = function() {
        this.marker.addTo(this.map);
        return this;
    };
    
    return Tree;
});
