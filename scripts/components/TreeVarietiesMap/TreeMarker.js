define(function(require) {
    "use strict";

    var L = require('leaflet');
    var map = require('mout/array/map');

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

    proto.initialize = function(treeVarieties, tree) {
        this.$content = $(popupContent);

        this.$id = this.$content.find('.id');
        this.$variety = this.$content.find('.variety');
        this.$latitude = this.$content.find('.latitude');
        this.$longitude = this.$content.find('.longitude');
        this.$delete = this.$content.find('.delete');
        this.$save = this.$content.find('.save');

        this.tree = tree;
        this.treeVarieties = treeVarieties;

        this.marker = L.marker(
            [tree.latitude(), tree.longitude()],
            {
                opacity: 0.75
            }
        );

        // Handlers
        this.onClickDeleteHandler = this.onClickDelete.bind(this);
        this.onClickSaveHandler = this.onClickSave.bind(this);
        this.onPopupOpenHandler = this.onPopupOpen.bind(this);
        this.onLatLngChangeHandler = this.onLatLngChange.bind(this);

        // Observers
        this.latitudeSubscriber = this.tree.latitude.subscribe(this.onLatLngChangeHandler);
        this.longitudeSubscriber = this.tree.longitude.subscribe(this.onLatLngChangeHandler);

        this.marker.bindPopup(this.$content.get(0));
    };

    proto.onAdd = function(map) {
        this.$delete.on('click', this.onClickDeleteHandler);
        this.$save.on('click', this.onClickSaveHandler);
        this.marker.on('popupopen', this.onPopupOpenHandler);

        this.marker.addTo(map);
    };

    proto.onClickDelete = function(event) {
        event.preventDefault();
        alert('delete');
    };

    proto.onClickSave = function(event) {
        event.preventDefault();

        if (this.$variety.val() !== this.tree.variety_id()) {
            this.tree.variety_id(this.$variety.val());
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

        this.$variety.html(map(
            this.treeVarieties.varieties(),
            function(variety) {
                return '<option value="' + variety.id + '">' + variety.name + '</option>';
            }
        )).val(this.tree.variety_id());

        this.$content.find('.latitude').val(this.tree.latitude());
        this.$content.find('.longitude').val(this.tree.longitude());
    };

    proto.onRemove = function(map) {
        this.$delete.off('click', this.onClickDeleteHandler);
        this.$save.off('click', this.onClickSaveHandler);
        this.marker.off('popupopen', this.onPopupOpenHandler);

        map.removeLayer(this.marker);
    };

    return TreeMarker;
});