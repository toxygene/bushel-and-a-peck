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

        this.onLatitudeChangeHandler = this.onLatitudeChange.bind(this);
        this.onLongitudeChangeHandler = this.onLongitudeChange.bind(this);
        this.onPopupOpenHandler = this.onPopupOpen.bind(this);
        this.onPopupCloseHandler = this.onPopupClose.bind(this);

        this.latitude.subscribe(this.onLatitudeChangeHandler);
        this.longitude.subscribe(this.onLongitudeChangeHandler);

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

    Tree.prototype.onLatitudeChange = function(newValue) {
        this.marker.setLatLng([newValue, this.longitude()]);
        this.marker.update();
    };

    Tree.prototype.onLongitudeChange = function(newValue) {
        this.marker.setLatLng([this.latitude(), newValue]);
        this.marker.update();
    };
    
    Tree.prototype.onPopupClose = function(event) {
        ko.cleanNode(this.marker.getPopup().getContent());
    };
    
    Tree.prototype.onPopupOpen = function(event) {
        ko.applyBindings(this, this.marker.getPopup().getContent());
    };

    Tree.prototype.show = function() {
        this.marker.addTo(this.map);
        return this;
    };
    
    return Tree;
});
