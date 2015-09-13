define(function(require) {
    "use strict";

    var filter = require('mout/array/filter');
    var forEach = require('mout/array/forEach');
    var GetJson = require('utils/GetJson');
    var ko = require('knockout');
    var map = require('mout/array/map');
    var RowViewModel = require('view-models/RowViewModel');
    var VarietyViewModel = require('view-models/VarietyViewModel');

    /**
     * @class VarietiesViewModel
     * @constructor
     */
    var VarietiesViewModel = function() {
        this.rows = ko.observableArray();
        this.varieties = ko.observableArray();

        // Handlers
        this.addRowHandler = this.addRow.bind(this);
        this.addVarietyHandler = this.addVariety.bind(this);
        this.getVarietiesWithRowsHandler = this.getVarietiesWithRows.bind(this);
        this.onDataLoadedHandler = this.onDataLoaded.bind(this);

        // Observers
        this.currentVarieties = ko.pureComputed(this.getVarietiesWithRowsHandler)
            .extend({trackArrayChanges: true});
    };

    var proto = VarietiesViewModel.prototype;

    proto.addRow = function(row) {
        this.rows.push(row);

        return this;
    };

    proto.addVariety = function(variety) {
        variety.rows = this.getComputedRowsForVariety(variety);

        this.varieties.push(variety);

        return this;
    };

    proto.getComputedRowsForVariety = function(variety) {
        return ko.pureComputed(function() {
            return filter(
                this.rows(),
                function(row) {
                    return row.variety_id() == variety.id;
                }
            );
        }.bind(this)).extend({trackArrayChanges: true});
    };

    proto.getVarietiesWithRows = function() {
        return filter(
            this.varieties(),
            function(variety) {
                return variety.rows().length;
            }
        );
    };

    proto.loadData = function() {
        return GetJson('api.json').then(this.onDataLoadedHandler);
    };

    proto.onDataLoaded = function (results) {
        forEach(
            map(
                results.data,
                VarietyViewModel.build
            ),
            this.addVarietyHandler
        );

        forEach(
            map(
                results.included,
                RowViewModel.build
            ),
            this.addRowHandler
        );
    };

    return VarietiesViewModel;
});