define(function(require) {
    "use strict";

    var $ = require('jquery');
    var ko = require('knockout');
    var L = require('leaflet');

    var content = '\
<div>\
    <div><label>Variety: <select></select></label></div>\
</div>\
<div>\
    <div>ID: <span data-bind="text: id"></span></div>\
    <div><label>Latitude: <input data-bind="value: latitude" type="text" /></label></div>\
    <div><label>Longitude: <input data-bind="value: longitude" type="text" /></label></div>\
    <div><button>Save</button></div>\
    <div><button>Delete</button></div>\
</div>';

    return L.Class.extend({
        initialize: function(varieties) {
            this.popup = L.popup();

            // causes errors when binding/opening the popup
            var div = document.createElement('div');
            $(div).html(content);

            this.popup.setContent(div);

            // apply the variety bindings?
        },
        onAdd: function(map) {
            this.popup
                .addTo(map);
        },
        onRemove: function(map) {
            map.removeLayer(this.popup);
        },
        setTree: function(tree) {
            debugger;
            ko.applyBindings(
                tree,
                this.popup.getContent()
            );
        }
    })
});