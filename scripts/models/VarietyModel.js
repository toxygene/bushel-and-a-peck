define(function(require) {
    var ko = require('knockout');

    var Variety = function() {
        this.id = null;
        this.name = null;

        this.trees = ko.observableArray();
        this.display = ko.observable(true);

        this.hasTrees = ko.computed(function() {
            return this.trees().length > 0;
        }.bind(this));
    };
    
    return Variety;
});
