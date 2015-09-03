define(function(require) {
    "use strict";

    var $ = require('jquery');
    var BaseComponent = require('components/BaseComponent');
    var inheritPrototype = require('mout/lang/inheritPrototype');
    var Map = require('components/TreeVarietiesMap/Map');

    /**
     * Tree varieties map
     *
     * @class TreeVarietiesMap
     * @constuctor
     * @param {jQuery} $element
     * @param {Object} options
     */
    var TreeVarietiesMap = function($element, options) {
        BaseComponent.call(this, $element, options);
    };

    TreeVarietiesMap.SELECTOR = '.js-tree-varieties-map';

    var proto = inheritPrototype(TreeVarietiesMap, BaseComponent);

    /**
     * Create the map component
     *
     * @chainable
     */
    proto.createChildren = function() {    
        this.map = new Map(this.$element.find(Map.SELECTOR));

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

    return TreeVarietiesMap;
});
