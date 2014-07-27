requirejs.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        knockout: '../bower_components/knockout/dist/knockout',
        leaflet: '../bower_components/leaflet/dist/leaflet',
        mout: '../bower_components/mout/src'
    }
});

requirejs(['jquery', 'knockout', 'leaflet', 'view-models/Tree'], function($, ko, L, Tree) {
    var map = L.map('map').setView([44.873571, -91.299130], 16);
    
    L.tileLayer('https://{s}.tiles.mapbox.com/v3/examples.map-i87786ca/{z}/{x}/{y}.png', {
        attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
    }).addTo(map);

    L.geoJson({
        "type": "FeaturesCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-91.299103, 44.873590]
                },
                "properties": {
                    "type": "Gala"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-91.299103, 44.873540]
                },
                "properties": {
                    "type": "Honeycrisp"
                }
            }

        ]
    }, {
        pointToLayer: function(feature, layer) {
            var tree = new Tree(feature);
            return tree.getMarker();
        }
    }).addTo(map);
});
