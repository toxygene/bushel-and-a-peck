define(function(require) {
    "use strict";

    var ko = require('knockout');

    /**
     * @class RowModel
     * @constructor
     * @param id
     * @param name
     * @param description
     * @param variety_id
     * @param points
     */
    var Row = function(id, name, description, variety_id, points) {
        this.id = ko.observable(id);
        this.name = ko.observable(name);
        this.description = ko.observable(description);
        this.variety_id = ko.observable(variety_id);
        this.points = ko.observableArray(points);
    };

    Row.build = function(data) {
        return new Row(
            data.id,
            data.name,
            data.description,
            data.variety_id,
            data.points
        );
    };

    return Row;
});