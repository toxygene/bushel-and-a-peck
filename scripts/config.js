requirejs.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        knockout: '../bower_components/knockout/dist/knockout',
        leaflet: '../bower_components/leaflet/dist/leaflet',
        mout: '../bower_components/mout/src'
    }
});

requirejs(['leaflet', 'view-models/MapControls', 'knockout'], function(L, MapControls, ko) {
    var map = L.map('map').setView([44.873571, -91.299130], 16);
    
    L.tileLayer('https://{s}.tiles.mapbox.com/v3/examples.map-i87786ca/{z}/{x}/{y}.png', {
        attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
    }).addTo(map);

    var mapControls = new MapControls(map, {
        trees: [
            {
                'id': 188,
                'type': 'Gala',
                'latitude': 44.873571,
                'longitude': -91.299130
            }
        ]
    });

    map.addControl(mapControls);
    ko.applyBindings(mapControls, $('#controls-container').get(0));
});
