define(function(require) {
    "use strict";

    var ko = require('knockout');

    var VarietyModel = function() {
        this.id = null;
        this.name = null;
        
        this.trees = ko.observableArray();
    };
    
    VarietyModel.build = function(id, name) {
        var variety = new VarietyModel();
        variety.id = id;
        variety.name = name;
        
        return variety;
    };
    
    return VarietyModel;
});
