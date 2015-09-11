define(function(require) {
    "use strict";

    var L = require('leaflet');

    var VarietyLayer = L.Class.extend({});

    var proto = VarietyLayer.prototype;

    proto.initialize = function(variety) {
        this.multiPolyline = L.multiPolyline([]);
        this.variety = variety;

        this.updateMultiPolyline();

        // Handlers
        this.updateMultiPolylineHandler = this.updateMultiPolyline.bind(this);

        this.variety.rows.subscribe(this.updateMultiPolylineHandler);
    };

    /**
     *
     * @chainable
     */
    proto.updateMultiPolyline = function() {
        this.multiPolyline.setLatLngs(this.variety.getRows());

        return this;
    };

    proto.onAdd = function(map) {
        map.addLayer(this.multiPolyline);
    };

    proto.onRemove = function(map) {
        map.removeLayer(this.multiPolyline);
    };

    return VarietyLayer;
});