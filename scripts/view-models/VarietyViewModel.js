define(function(require) {
    "use strict";

    /**
     * @class VarietyViewModel
     * @constructor
     */
    var VarietyViewModel = function() {
        this.id = null;
        this.name = null;
        this.rows = null;
    };

    VarietyViewModel.build = function(variety) {
        var varietyViewModel = new VarietyViewModel();
        varietyViewModel.id = variety.id;
        varietyViewModel.name = variety.name;

        return varietyViewModel;
    };

    var proto = VarietyViewModel.prototype;

    return VarietyViewModel;
});