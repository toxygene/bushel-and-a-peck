requirejs.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        knockout: '../bower_components/knockout/dist/knockout',
        leaflet: '../bower_components/leaflet/dist/leaflet',
        mout: '../bower_components/mout/src'
    }
});

requirejs(['knockout', 'view-models/AdminMapComponent'], function(ko, AdminMapComponent) {
    var adminMapComponent = new AdminMapComponent({
        types: [{
            name: 'Gala',
            trees: [{
                id: 1,
                latitude: 44.873,
                longitude: -91.299
            }, {
                id: 2,
                latitude: 44.875,
                longitude: -91.301,
            }]
        }, {
            name: 'Honeycrisp',
            trees: []
        }]
    });

    ko.applyBindings(adminMapComponent);
});
