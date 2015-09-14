define(function(require) {
    "use strict";

    var filter = require('mout/array/filter');
    var forEach = require('mout/array/forEach');
    var GetJson = require('utils/GetJson');
    var ko = require('knockout');
    var map = require('mout/array/map');
    var RowModel = require('models/Row');
    var some = require('mout/array/some');
    var TreeVarietyViewModel = require('view-models/TreeVariety');
    var VarietyModel = require('models/Variety');

    /**
     * @class TreeVarietiesViewModel
     * @constructor
     */
    var TreeVarieties = function() {
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

    var proto = TreeVarieties.prototype;

    proto.addRow = function(row) {
        this.rows.push(row);

        return this;
    };

    proto.addVariety = function(variety) {
        this.varieties.push(variety);

        return this;
    };

    proto.getComputedRowsForVariety = function(variety) {
        return ko.pureComputed(function() {
            return filter(
                this.rows(),
                function(row) {
                    return row.variety_id() == variety.id();
                }
            );
        }.bind(this)).extend({trackArrayChanges: true});
    };

    proto.getTreeVarietyViewModelForVariety = function(variety) {
        return new TreeVarietyViewModel(variety, this.getComputedRowsForVariety(variety));
    };

    proto.getVarietiesWithRows = function() {
        return filter(
            this.varieties(),
            function(variety) {
                return some(
                    this.rows(),
                    function(row) {
                        return variety.id() == row.variety_id();
                    }
                )
            }.bind(this)
        );
    };

    proto.loadData = function() {
        return GetJson('api.json').then(this.onDataLoadedHandler);
    };

    proto.onDataLoaded = function (results) {
        forEach(
            map(
                results.data,
                VarietyModel.build
            ),
            this.addVarietyHandler
        );

        forEach(
            map(
                results.included,
                RowModel.build
            ),
            this.addRowHandler
        );
    };

    return TreeVarieties;
});