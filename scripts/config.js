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
        trees: [{
            id: 1,
            latitude: 44.873571,
            longitude: -91.299130,
            type: "Gala"
        }]
    });

    ko.applyBindings(adminMapComponent);
});
