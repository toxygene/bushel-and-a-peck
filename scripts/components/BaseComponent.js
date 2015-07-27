define(function(require) {    
    var Base = function($element, options) {
        this.$element = $element;
        this.options = options;
    };
    
    var proto = Base.prototype;
    
    proto.createHandlers = function() {
        return this;
    };
    
    proto.destroyHandlers = function() {
        return this;
    };
    
    proto.createChildren = function() {
        return this;
    };
    
    proto.destroyChildren = function() {
        return this;
    };
    
    proto.enable = function() {
        return this;
    };
    
    proto.destroy = function() {
        return this;
    };
    
    proto.start = function() {
        return this.createHandlers()
            .createChildren()
            .enable();
    };
    
    proto.stop = function() {
        return this.disable()
            .destroyChildren()
            .destroyHandlers();
    };
    
    return Base;
});
