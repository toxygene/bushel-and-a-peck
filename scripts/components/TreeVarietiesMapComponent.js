define(function(require) {
    var $ = require('jquery');
    var BaseComponent = require('components/BaseComponent');
    var inheritPrototype = require('mout/lang/inheritPrototype');
    var MapComponent = require('components/TreeVarietiesMap/MapComponent');
    
    var TreeVarietiesMapComponent = function($element, options) {
        BaseComponent.call(this, $element, options);
    }

    TreeVarietiesMapComponent.SELECTOR = '.js-tree-varieties-map';

    var proto = inheritPrototype(TreeVarietiesMapComponent, BaseComponent);

    proto.createChildren = function() {    
        this.map = new MapComponent(this.$element.find(MapComponent.SELECTOR));

        return this;
    };
    
    proto.enable = function() {
        this.map.start();
        
        return this;
    };

    return TreeVarietiesMapComponent;
});
