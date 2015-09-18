define(function(require) {
    "use strict";

    var filter = require('mout/array/filter');
    var forEach = require('mout/array/forEach');
    var L = require('leaflet');
    var pluck = require('mout/array/pluck');
    var RowLayer = require('components/TreeVarietiesMap/RowLayer');

    var VarietyLayer = L.Class.extend({});

    var proto = VarietyLayer.prototype;

    proto.initialize = function(treeVarietyViewModel, treeVarietiesViewModel) {
        this.layers = {};
        this.layerGroup = L.layerGroup();

        this.treeVarietiesViewModel = treeVarietiesViewModel;
        this.treeVarietyViewModel = treeVarietyViewModel;

        // Handlers
        this.addRowHandler = this.addRow.bind(this);
        this.onRowsChangeHandler = this.onRowsChange.bind(this);
        this.removeRowHandler = this.removeRow.bind(this);

        // Observers
        this.rowsSubscriber = this.treeVarietyViewModel.rows.subscribe(this.onRowsChangeHandler, null, 'arrayChange');

        forEach(this.treeVarietyViewModel.rows(), this.addRowHandler);
    };

    proto.destroy = function() {
        this.rowsSubscriber.dispose();
    };

    proto.addRow = function(row) {
        this.layers[row.id()] = new RowLayer(row, this.treeVarietiesViewModel);
        this.layerGroup.addLayer(this.layers[row.id()]);
        return this;
    };

    proto.onAdd = function(map) {
        map.addLayer(this.layerGroup);
    };

    proto.onRemove = function(map) {
        map.removeLayer(this.layerGroup);
    };

    proto.onRowsChange = function(changes) {
        forEach(
            pluck(
                filter(
                    changes,
                    function(change) {
                        return change.status == "deleted";
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
        this.layerGroup.removeLayer(this.layers[row.id()]);
        delete this.layers[row.id()];
        return this;
    };

    return VarietyLayer;
});