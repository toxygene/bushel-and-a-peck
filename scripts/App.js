define(function(require) {
    var $ = require('jquery');
    var forEach = require('mout/array/forEach');
    var TreeVarietiesMapComponent = require('components/TreeVarietiesMapComponent');

    var componentModules = [
        TreeVarietiesMapComponent
    ];

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
