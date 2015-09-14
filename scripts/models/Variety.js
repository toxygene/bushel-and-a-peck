define(function(require) {
    "use strict";

    var ko = require('knockout');

    /**
     * @class VarietyModel
     * @constructor
     * @param id
     * @param name
     */
    var Variety = function(id, name) {
        this.id = ko.observable(id);
        this.name = ko.observable(name);
    };

    Variety.build = function(data) {
        return new Variety(
            data.id,
            data.name
        );
    };

    return Variety;
});