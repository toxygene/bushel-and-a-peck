define(function(require) {
    "use strict";

    var L = require('leaflet');

    var RowLayer = L.Class.extend({});

    var proto = RowLayer.prototype;

    proto.initialize = function(row) {
        this.polyline = L.polyline([]);
        this.row = row;

        // Handlers
        this.onPointsChangeHandler = this.onPointsChange.bind(this);

        // Observers
        this.pointsSubscriber = this.row.points.subscribe(this.onPointsChangeHandler);

        this.updatePolyline();
    };

    proto.destroy = function() {
        this.pointsSubscriber.dispose();
    };

    proto.onAdd = function(map) {
        map.addLayer(this.polyline);
    };

    proto.onRemove = function(map) {
        map.removeLayer(this.polyline);
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