define(function(require) {
    "use strict";

    var ko = require('knockout');
    var VarietyViewModel = require('view-models/VarietyViewModel');

    /**
     * @class VarietiesViewModel
     * @constructor
     */
    var VarietiesViewModel = function() {
        this.varieties = ko.observableArray();
    };

    var proto = VarietiesViewModel.prototype;

    proto.addVariety = function(variety) {
        this.varieties.push(variety);

        return this;
    };

    proto.addVarietyData = function(variety) {
        return this.addVariety(VarietyViewModel.build(variety));
    };

    return VarietiesViewModel;
});