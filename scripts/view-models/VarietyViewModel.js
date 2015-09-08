define(function(require) {
    "use strict";

    var filter = require('mout/array/filter');
    var ko = require('knockout');
    var map = require('mout/array/map');

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

    var proto = VarietyViewModel.prototype;

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

    proto.getData = function() {
        return {
            id: this.id,
            name: this.name,
            trees: map(this.trees(), function(tree) { return tree.id; })
        }
    };

    return VarietyViewModel;
});
