define(function(require) {
    var $ = require('jquery');
    var filter = require('mout/array/filter');
    var forEach = require('mout/array/forEach');
    var ko = require('knockout');
    var L = require('leaflet');
    var map = require('mout/array/map');
    var pluck = require('mout/array/pluck');
    var Tree = require('view-models/Tree');
    var unique = require('mout/array/unique');
    
    return L.Control.extend({
        disableMapMovement: function() {
            this.m.dragging.disable();
            this.m.touchZoom.disable();
            this.m.doubleClickZoom.disable();
            this.m.scrollWheelZoom.disable();
            this.m.boxZoom.disable();
            this.m.keyboard.disable();
        },
        enableMapMovement: function() {
            this.m.dragging.enable();
            this.m.touchZoom.enable();
            this.m.doubleClickZoom.enable();
            this.m.scrollWheelZoom.enable();
            this.m.boxZoom.enable();
            this.m.keyboard.enable();
        },
        getTreesByType: function(type) {
            return filter(this.trees(), function(tree) {
                return tree.type() === type;
            });
        },
        hideTreesByType: function(type) {
            forEach(this.getTreesByType(type), function(tree) {
                tree.hide();
            });
        },
        initialize: function(m, data) {
            L.Util.setOptions(this);
            
            this.m = m;

            this.trees = ko.observableArray(map(data.trees, function(tree) {
                return new Tree(m, tree.id, tree.type, tree.latitude, tree.longitude);
            }));

            this.treeTypes = ko.computed(function() {
                return unique(map(this.trees(), function(tree) {
                    return tree.type();
                }));
            }, this);

            this.updateTreeTypeVisibilityHandler = this.updateTreeTypeVisibility.bind(this);
        },
        onAdd: function() {
            this.$element = $('#controls-container');
            
            this.disableMapMovementHandler = this.disableMapMovement.bind(this);
            this.enableMapMovementHandler = this.enableMapMovement.bind(this);

            this.$element.on('mouseenter.MapControls', this.disableMapMovementHandler);
            this.$element.on('mouseleave.MapControls', this.enableMapMovementHandler);
            
            return this.$element.get(0);
        },
        onRemove: function() {
            this.$element.off('mouseenter.MapControls', this.disableMapMovementHandler);
            this.$element.off('mouseleave.MapControls', this.enableMapMovementHandler);
        },
        options: {
            position: 'topright'
        },
        showTreesByType: function(type) {
            forEach(this.getTreesByType(type), function(tree) {
                tree.show();
            });
        },
        updateTreeTypeVisibility: function(type, event) {
            if ($(event.target).prop('checked')) {
                this.showTreesByType(type);
            } else {
                this.hideTreesByType(type);
            }
            return true;
        }
    });
});
