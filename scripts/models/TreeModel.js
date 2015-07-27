define(function(require) {
    var ko = require('knockout');

    var TreeModel = function() {
        this.id = null;
        
        this.variety_id = ko.observable();
        this.longitude = ko.observable();
        this.latitude = ko.observable();
    };
    
    return TreeModel;
});
