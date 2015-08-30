define(function(require) {
    var ko = require('knockout');

    var TreeModel = function() {
        this.id = null;
        this.longitude = ko.observable();
        this.latitude = ko.observable();
        this.variety = ko.observable();
    };
    
    TreeModel.build = function(id, latitude, longitude, variety) {
        var tree = new TreeModel();
        tree.id = id;
        tree.latitude(latitude);
        tree.longitude(longitude);
        tree.variety(variety);
        
        return tree;
    };
    
    return TreeModel;
});
