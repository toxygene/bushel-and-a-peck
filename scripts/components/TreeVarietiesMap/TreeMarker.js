define(function(require) {
    "use strict";

    var L = require('leaflet');

    var TreeMarker = L.Class.extend({});
    var proto = TreeMarker.prototype;

    proto.initialize = function(tree, editTreePopup) {
        this.marker = L.marker(
            [tree.latitude(), tree.longitude()],
            {
                opacity: 0.75
            }
        );

        // cleanup
        this.marker.on('click', function() {
            editTreePopup.show(tree, this.marker);
        }.bind(this));
    };

    proto.onAdd = function(map) {
        this.marker.addTo(map);
    };

    proto.onRemove = function(map) {
        map.removeLayer(this.marker);
    };

    return TreeMarker;
});