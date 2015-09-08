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

    var proto = TreeViewModel.prototype;

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

    proto.getData = function() {
        return {
            id: this.id,
            latitude: this.latitude(),
            longitude: this.longitude(),
            variety_id: this.variety_id()
        };
    };
    
    return TreeViewModel;
});
