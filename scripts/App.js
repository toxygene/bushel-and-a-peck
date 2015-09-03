define(function(require) {
    "use strict";

    var $ = require('jquery');
    var forEach = require('mout/array/forEach');
    var TreeVarietiesMapComponent = require('components/TreeVarietiesMap');

    var componentModules = [
        TreeVarietiesMapComponent
    ];

    /**
     * Component initializer for the application
     *
     * @constructor
     * @param {jQuery} $element
     */
    var App = function($element) {
        this.$element = $element;
    };
    
    var proto = App.prototype;

    proto.run = function() {
        forEach(componentModules, function(componentModule) {
            forEach(this.$element.find(componentModule.SELECTOR), function(element) {
                new componentModule($(element), {}).start();
            });
        }, this);
    };
    
    return App;
});
