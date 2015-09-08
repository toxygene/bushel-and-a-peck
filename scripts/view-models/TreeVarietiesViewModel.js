define(function(require) {
    "use strict";

    var filter = require('mout/array/filter');
    var find = require('mout/array/find');
    var forEach = require('mout/array/forEach');
    var invoke = require('mout/array/invoke');
    var ko = require('knockout');
    var map = require('mout/array/map');
    var pluck = require('mout/array/pluck');
    var TreeViewModel = require('view-models/TreeViewModel');
    var unique = require('mout/array/unique');
    var VarietyViewModel = require('view-models/VarietyViewModel');

    /**
     * Tree view model
     *
     * @class TreeVarietiesViewModel
     * @constructor
     * @param {array} trees
     * @param {array} varieties
     */
    var TreeVarietiesViewModel = function(trees, varieties) {
        // Handlers
        this.addTreeHandler = this.addTree.bind(this);
        this.addVarietyHandler = this.addVariety.bind(this);
        this.findVarietyByIdHandler = this.findVarietyById.bind(this);
        this.getVarietiesWithTreesHandler = this.getVarietiesWithTrees.bind(this);

        // Observables
        this.trees = ko.observableArray();
        this.varieties = ko.observableArray();

        this.currentVarieties = ko.pureComputed(this.getVarietiesWithTreesHandler)
            .extend({trackArrayChanges: true});

        // Initial data population
        forEach(trees, this.addTreeHandler);
        forEach(varieties, this.addVarietyHandler);
    };

    var proto = TreeVarietiesViewModel.prototype;

    /**
     * Add a tree
     *
     * @chainable
     * @param {array} tree
     */
    proto.addTree = function(tree) {
        this.trees.push(TreeViewModel.build(
            tree.id,
            tree.latitude,
            tree.longitude,
            tree.variety_id
        ));

        return this;
    };

    /**
     * Add a variety
     *
     * @chainable
     * @param {array} variety
     */
    proto.addVariety = function(variety) {
        this.varieties.push(VarietyViewModel.build(
            this.trees,
            variety.id,
            variety.name
        ));

        return this;
    };

    /**
     * Find a variety by ID
     *
     * @param {int} varietyId
     * @returns {VarietyViewModel}
     */
    proto.findVarietyById = function(varietyId) {
        return find(this.varieties(), function(variety) {
            return variety.id == varietyId;
        });
    };

    /**
     * Get the varieties that have a tree
     *
     * @return {array}
     */
    proto.getVarietiesWithTrees = function() {
        var varieties = map(
            unique(
                map(
                    this.trees(),
                    function(tree) {
                        return tree.variety_id();
                    }
                )
            ),
            this.findVarietyByIdHandler
        );

        return varieties;
    };

    return TreeVarietiesViewModel;
});