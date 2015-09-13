define(function(require) {
    "use strict";

    var filter = require('mout/array/filter');
    var forEach = require('mout/array/forEach');
    var L = require('leaflet');
    var pluck = require('mout/array/pluck');
    var RowLayer = require('components/TreeVarietiesMap/RowLayer');

    var VarietyLayer = L.Class.extend({});

    var proto = VarietyLayer.prototype;

    proto.initialize = function(variety) {
        this.layers = {};
        this.layerGroup = L.layerGroup();

        this.variety = variety;

        // Handlers
        this.addRowHandler = this.addRow.bind(this);
        this.onRowsChangeHandler = this.onRowsChange.bind(this);
        this.removeRowHandler = this.removeRow.bind(this);

        // Observers
        this.rowsSubscriber = this.variety.rows.subscribe(this.onRowsChangeHandler, null, 'arrayChange');

        forEach(this.variety.rows(), this.addRowHandler);
    };

    proto.destroy = function() {
        this.rowsSubscriber.dispose();
    };

    proto.addRow = function(row) {
        this.layers[row.id] = new RowLayer(row);
        this.layerGroup.addLayer(this.layers[row.id]);
        return this;
    };

    proto.onAdd = function(map) {
        map.addLayer(this.layerGroup);
    };

    proto.onRemove = function(map) {
        map.removeLayer(this.layerGroup);
    };

    proto.onRowsChange = function(changes) {
        debugger;
        forEach(
            pluck(
                filter(
                    changes,
                    function(change) {
                        return change.status == "removed";
                    }
                ),
                'value'
            ),
            this.removeRowHandler
        );

        forEach(
            pluck(
                filter(
                    changes,
                    function(change) {
                        return change.status == "added";
                    }
                ),
                'value'
            ),
            this.addRowHandler
        );
    };

    proto.removeRow = function(row) {
        this.layerGroup.removeLayer(this.layers[row.id]);
        delete this.layers[row.id];
        return this;
    };

    return VarietyLayer;
});