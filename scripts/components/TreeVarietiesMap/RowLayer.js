define(function(require) {
    "use strict";

    var $ = require('jquery');
    var L = require('leaflet');
    var map = require('mout/array/map');

    var popupContent = '<section>\
    <h1>Edit Row</h1>\
    <section>\
        <div><label>Variety <select class="row-variety-id"></select></label></div>\
        <div><label>Name <input class="row-name" type="text" /></label></div>\
        <div><label>Description <textarea class="row-description"></textarea></label></div>\
        <div><button class="save" name="save">Save</button><button class="resize" name="resize">Resize</button><button class="delete" name="delete">Delete</button></div>\
    </section>\
</section>';

    var RowLayer = L.Class.extend({});

    var proto = RowLayer.prototype;

    proto.initialize = function(row, treeVarietiesViewModel) {
        this.row = row;
        this.treeVarietiesViewModel = treeVarietiesViewModel;

        this.polyline = L.polyline([], {
            weight: 3
        });
        this.popup = L.popup();

        this.$content = $(popupContent);
        this.$varietyId = this.$content.find('.row-variety-id');
        this.$name = this.$content.find('.row-name');
        this.$description = this.$content.find('.row-description');

        this.popup
            .setContent(this.$content.get(0));

        this.polyline
            .bindPopup(this.popup);

        // Handlers
        this.onPointsChangeHandler = this.onPointsChange.bind(this);
        this.onPopupCloseHandler = this.onPopupClose.bind(this);
        this.onPopupOpenHandler = this.onPopupOpen.bind(this);
        this.onClickDeleteHandler = this.onClickDelete.bind(this);
        this.onClickResizeHandler = this.onClickResize.bind(this);
        this.onClickSaveHandler = this.onClickSave.bind(this);

        // Observers
        this.pointsSubscriber = this.row.points.subscribe(this.onPointsChangeHandler);
    };

    proto.destroy = function() {
        this.pointsSubscriber.dispose();
    };

    proto.onAdd = function(map) {
        this.updatePolyline();

        map.addLayer(this.polyline);

        map.on('popupopen', this.onPopupOpenHandler);
        map.on('popupclose', this.onPopupCloseHandler);
    };

    proto.onClickDelete = function(event) {
        event.preventDefault();

        this.treeVarietiesViewModel
            .rows
            .remove(this.row);

        this.polyline
            .closePopup();
    };

    proto.onClickResize = function(event) {
        event.preventDefault();

        this.polyline
            .closePopup();
    };

    proto.onClickSave = function(event) {
        event.preventDefault();

        this.row.variety_id(this.$content.find('.row-variety-id').val());
        this.row.name(this.$content.find('.row-name').val());
        this.row.description(this.$content.find('.row-description').val());

        this.polyline
            .closePopup();
    };

    proto.onRemove = function(map) {
        map.removeLayer(this.polyline);

        map.off('popupopen', this.onPopupOpenHandler);
        map.off('popupclose', this.onPopupCloseHandler);
    };

    proto.onPopupClose = function(event) {
        if (event.popup != this.popup) {
            return;
        }

        this.$content.find('.delete').off('click', this.onClickDeleteHandler);
        this.$content.find('.resize').off('click', this.onClickResizeHandler);
        this.$content.find('.save').off('click', this.onClickSaveHandler);
    };

    proto.onPopupOpen = function(event) {
        if (event.popup != this.popup) {
            return;
        }

        this.$content.find('.delete').on('click', this.onClickDeleteHandler);
        this.$content.find('.resize').on('click', this.onClickResizeHandler);
        this.$content.find('.save').on('click', this.onClickSaveHandler);

        this.$content.find('.row-variety-id').html(map(
            this.treeVarietiesViewModel.varieties(),
            function(variety) {
                return '<option value="' + variety.id() + '">' + variety.name() + '</option>';
            }
        ));

        this.$content.find('.row-variety-id').val(this.row.variety_id());
        this.$content.find('.row-name').val(this.row.name());
        this.$content.find('.row-description').val(this.row.description());

        this.popup
            .setContent(this.$content.get(0))
            .update();
    };

    proto.onPointsChange = function(changes) {
        this.updatePolyline();
    };

    proto.updatePolyline = function() {
        this.polyline.setLatLngs(
            this.row.points() || []
        );
    };

    return RowLayer;
});