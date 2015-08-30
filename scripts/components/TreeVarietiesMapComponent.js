define(function(require) {
    var $ = require('jquery');
    var BaseComponent = require('components/BaseComponent');
    var inheritPrototype = require('mout/lang/inheritPrototype');
    var MapComponent = require('components/TreeVarietiesMap/MapComponent');

    /**
     * Tree varieties map
     *
     * @constuctor
     * @param {jQuery} $element
     * @param {Object} options
     */
    var TreeVarietiesMapComponent = function($element, options) {
        BaseComponent.call(this, $element, options);
    }

    TreeVarietiesMapComponent.SELECTOR = '.js-tree-varieties-map';

    var proto = inheritPrototype(TreeVarietiesMapComponent, BaseComponent);

    /**
     * Create the map component
     *
     * @chainable
     */
    proto.createChildren = function() {    
        this.map = new MapComponent(this.$element.find(MapComponent.SELECTOR));

        return this;
    };
    
    /**
     * Destroy the map component
     *
     * @chainable
     */
    proto.destroyChildren = function() {
        this.map = null;
    };

    /**
     * Enable the map component
     *
     * @chainable
     */
    proto.enable = function() {
        this.map.start();
        
        return this;
    };
    
    /**
     * Disable the map component
     *
     * @chainable
     */
    proto.disable = function() {
        this.map.stop();
        
        return this;
    };

    return TreeVarietiesMapComponent;
});
