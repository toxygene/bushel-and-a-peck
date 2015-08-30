define(function(require) {
    /**
     * Base component
     *
     * @constructor
     * @param {jQuery} $element
     * @param {Object} options
     */
    var BaseComponent = function($element, options) {
        this.$element = $element;
        this.options = options;
    };
    
    var proto = BaseComponent.prototype;

    /**
     * Create handlers for the component
     *
     * @chainable
     * @see start
     */
    proto.createHandlers = function() {
        return this;
    };

    /**
     * Destroy handlers for the component
     *
     * @chainable
     * @see stop
     */
    proto.destroyHandlers = function() {
        return this;
    };

    /**
     * Create children for the component
     *
     * @chainable
     * @see start
     */
    proto.createChildren = function() {
        return this;
    };

    /**
     * Destroy children for the component
     *
     * @chainable
     * @see stop
     */
    proto.destroyChildren = function() {
        return this;
    };

    /**
     * Enable the component
     *
     * @chainable
     * @see start
     */
    proto.enable = function() {
        return this;
    };

    /**
     * Disable the component
     *
     * @chainable
     * @see stop
     */
    proto.disable = function() {
        return this;
    };
    
    /**
     * Start the component
     *
     * @chainable
     */
    proto.start = function() {
        return this.createHandlers()
            .createChildren()
            .enable();
    };
    
    /**
     * Stop the component
     *
     * @chainable
     */
    proto.stop = function() {
        return this.disable()
            .destroyChildren()
            .destroyHandlers();
    };
    
    return BaseComponent;
});
