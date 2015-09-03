define(function(require) {
    "use strict";

    var $ = require('jquery');
    var ko = require('knockout');
    var L = require('leaflet');

    var content = '\
<div>\
    <div><label>ID</label> <span class="id"></span></div>\
    <div><label>Variety <select class="variety"></select></label></div>\
    <div><label>Latitude <input class="latitude" type="text" /></label></div>\
    <div><label>Longitude <input class="longitude" type="text" /></label></div>\
</div>\
';

    var EditTreePopup = L.Class.extend({});
    var proto = EditTreePopup.prototype;

    proto.initialize = function(treeVarietiesViewModel) {
        this.treeVarietiesViewModel = treeVarietiesViewModel;

        this.popup = L.popup();
    };

    proto.show = function() {
    };

    return EditTreePopup;
});