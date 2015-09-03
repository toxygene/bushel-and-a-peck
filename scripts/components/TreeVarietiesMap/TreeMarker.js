define(function(require) {
    "use strict";

    var L = require('leaflet');

    var popupContent = '\
<div>\
    <div><label>ID</label> <span class="id"></span></div>\
    <div><label>Variety <select class="variety"></select></label></div>\
    <div><label>Latitude <input class="latitude" type="text" /></label></div>\
    <div><label>Longitude <input class="longitude" type="text" /></label></div>\
    <div><button class="save">Save</button></div>\
    <div><button class="delete">Delete</button></div>\
</div>\
';

    var TreeMarker = L.Class.extend({});
    var proto = TreeMarker.prototype;

    proto.initialize = function(tree) {
        this.$content = $(popupContent);

        this.$id = this.$content.find('.id');
        this.$variety = this.$content.find('.variety');
        this.$latitude = this.$content.find('.latitude');
        this.$longitude = this.$content.find('.longitude');

        this.marker = L.marker(
            [tree.latitude(), tree.longitude()],
            {
                opacity: 0.75
            }
        );
        this.tree = tree;

        // Handlers
        this.onClickDeleteHandler = this.onClickDelete.bind(this);
        this.onClickSaveHandler = this.onClickSave.bind(this);
        this.onPopupOpenHandler = this.onPopupOpen.bind(this);
        this.onLatLngChangeHandler = this.onLatLngChange.bind(this);

        // Events
        this.$content.find('.delete').on('click', this.onClickDeleteHandler);
        this.$content.find('.save').on('click', this.onClickSaveHandler);
        this.marker.on('popupopen', this.onPopupOpenHandler);

        // Observers
        this.tree.latitude.subscribe(this.onLatLngChangeHandler);
        this.tree.longitude.subscribe(this.onLatLngChangeHandler);

        this.marker
            .bindPopup(this.$content.get(0));
    };

    proto.onAdd = function(map) {
        this.marker.addTo(map);
    };

    proto.onClickDelete = function(event) {
        event.preventDefault();
        alert('delete');
    };

    proto.onClickSave = function(event) {
        event.preventDefault();

        if (this.$variety.val() !== this.tree.variety_id()) {
            //this.tree.variety_id(this.$variety.val());
        }

        if (this.$latitude.val() !== this.tree.latitude()) {
            this.tree.latitude(this.$latitude.val());
        }

        if (this.$longitude.val() !== this.tree.longitude()) {
            this.tree.longitude(this.$longitude.val());
        }

        this.marker.closePopup();
    };

    proto.onLatLngChange = function(event) {
        this.marker
            .setLatLng([this.tree.latitude(), this.tree.longitude()])
            .update();
    };

    proto.onPopupOpen = function(event) {
        this.$id.text(this.tree.id);
        this.$content.find('.variety').val(this.tree.variety_id());
        this.$content.find('.latitude').val(this.tree.latitude());
        this.$content.find('.longitude').val(this.tree.longitude());
    };

    proto.onRemove = function(map) {
        map.removeLayer(this.marker);
    };

    return TreeMarker;
});