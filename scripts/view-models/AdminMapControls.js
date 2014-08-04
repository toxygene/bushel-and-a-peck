define(function(require) {
    var $ = require('jquery');
    var L = require('leaflet');

    return L.Control.extend({
        onAdd: function(map) {
            var $element = $('#controls-container');

            return $element.show().get(0);
        },
        onRemove: function(map) {
        }
    });
});
