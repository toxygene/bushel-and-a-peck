define(function(require) {
    "use strict";

    var ko = require('knockout');

    /**
     * @class TreeViewModel
     * @constructor
     */
    var TreeViewModel = function() {
        this.id = null;
        this.longitude = ko.observable();
        this.latitude = ko.observable();
        this.variety_id = ko.observable();
    };

    /**
     * Builder
     *
     * @param {int} id
     * @param {float} latitude
     * @param {float} longitude
     * @param {int} variety_id
     * @returns {TreeViewModel}
     */
    TreeViewModel.build = function(id, latitude, longitude, variety_id) {
        var tree = new TreeViewModel();
        tree.id = id;
        tree.latitude(latitude);
        tree.longitude(longitude);
        tree.variety_id(variety_id);
        
        return tree;
    };
    
    return TreeViewModel;
});
