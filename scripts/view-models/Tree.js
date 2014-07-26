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

        this.onPopupOpenHandler = this.onPopupOpen.bind(this);
        this.onPopupCloseHandler = this.onPopupClose.bind(this);

        this.marker = L.marker([this.latitude(), this.longitude()]);
        this.marker.bindPopup($('#popup').get(0));
        this.marker.on('popupopen', this.onPopupOpenHandler);
        this.marker.on('popupclose', this.onPopupCloseHandler);
        this.show();
    };

    Tree.prototype.hide = function() {
        this.map.removeLayer(this.marker);
        return this;
    };
    
    Tree.prototype.onPopupClose = function(event) {
    };
    
    Tree.prototype.onPopupOpen = function(event) {
        ko.applyBindings(this, this.getPopup());
    };

    Tree.prototype.show = function() {
        this.marker.addTo(this.map);
        return this;
    };
    
    return Tree;
});
