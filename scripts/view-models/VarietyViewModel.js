define(function(require) {
    "use strict";

    var forEach = require('mout/array/forEach');
    var ko = require('knockout');
    var map = require('mout/array/map');

    /**
     * @class VarietyViewModel
     * @constructor
     */
    var VarietyViewModel = function() {
        this.id = null;
        this.name = null;
        this.rows = ko.observableArray();

        this.addRowHandler = this.addRow.bind(this);
    };

    VarietyViewModel.build = function(variety) {
        var varietyViewModel = new VarietyViewModel();
        varietyViewModel.id = variety.id;
        varietyViewModel.name = variety.name;
        forEach(variety.rows, varietyViewModel.addRowHandler);

        return varietyViewModel;
    };

    var proto = VarietyViewModel.prototype;

    proto.addRow = function(points) {
        this.rows.push(ko.observable(points));
    };

    proto.getRows = function() {
        return map(
            this.rows(),
            function(row) {
                return row();
            }
        );
    };

    return VarietyViewModel;
});