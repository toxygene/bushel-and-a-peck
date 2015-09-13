define(function(require) {
    var ko = require('knockout');

    var RowViewModel = function() {
        this.id = null;
        this.name = null;
        this.description = null;
        this.points = ko.observableArray();

        this.variety_id = ko.observable();
    };

    RowViewModel.build = function(row) {
        var rowViewModel = new RowViewModel();
        rowViewModel.id = row.id;
        rowViewModel.name = row.name;
        rowViewModel.description = row.description;
        rowViewModel.variety_id(row.variety_id);
        rowViewModel.points(row.points);

        return rowViewModel;
    };

    var proto = RowViewModel.prototype;

    return RowViewModel;
});