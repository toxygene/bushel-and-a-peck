define(function(require) {
    "use strict";

    var filter = require('mout/array/filter');
    var ko = require('knockout');

    /**
     * @class VarietyViewModel
     * @constructor
     * @param {observableArray} trees
     */
    var VarietyViewModel = function(trees) {
        this.id = null;
        this.name = null;

        this.trees = ko.computed(function() {
            return filter(
                trees(),
                function(tree) {
                    return tree.variety_id() == this.id;
                },
                this
            )
        }, this).extend({trackArrayChanges: true});
    };

    /**
     * Builder
     *
     * @param {observableArray} trees
     * @param {int} id
     * @param {string} name
     * @returns {VarietyViewModel}
     */
    VarietyViewModel.build = function(trees, id, name) {
        var variety = new VarietyViewModel(trees);
        variety.id = id;
        variety.name = name;

        return variety;
    };

    return VarietyViewModel;
});
