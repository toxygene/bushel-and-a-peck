define(function(require) {
    var $ = require('jquery');
    var find = require('mout/array/find');
    var L = require('leaflet');
    var Tree = require('view-models/Tree');

    return L.Control.extend({
        initialize: function(types) {
            this.$element = $('#controls-container');
            this.onClickAddTreeHandler = this.onClickAddTree.bind(this);
            this.onMouseEnterHandler = this.onMouseEnter.bind(this);
            this.onMouseLeaveHandler = this.onMouseLeave.bind(this);
            this.types = types;

            L.Util.setOptions(this);
        },
        onAdd: function(map) {
            $('#add-tree').on('click', map, this.onClickAddTreeHandler);
            this.$element.on('mouseenter', map, this.onMouseEnterHandler);
            this.$element.on('mouseleave', map, this.onMouseLeaveHandler);

            return this.$element.show().get(0);
        },
        onClickAddTree: function(event) {
            event.preventDefault();
     
            var map = event.data;
            
            var typeName = $('#tree-type').val();
            var type = find(this.types(), function(type) {
                return type.name() === typeName;
            });

            if ($('#location-geolocation').prop('checked')) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        var tree = new Tree(null, position.coords.latitude, position.coords.longitude);
                        type.trees.push(tree);
                        tree.marker.openPopup();
                    },
                    null,
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0
                    }
                );
            } else if ($('#location-map-center').prop('checked')) {
                type.trees.push(new Tree(null, map.getCenter().lat, map.getCenter().lng));
            }
        },
        onMouseEnter: function(event) {
            var map = event.data;
            
            map.dragging.disable();
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            map.scrollWheelZoom.disable();
            map.boxZoom.disable();
            map.keyboard.disable();
        },
        onMouseLeave: function(event) {
            var map = event.data;

            map.dragging.enable();
            map.touchZoom.enable();
            map.doubleClickZoom.enable();
            map.scrollWheelZoom.enable();
            map.boxZoom.enable();
            map.keyboard.enable();
        },
        onRemove: function(map) {
            $('#add-tree').off('click', map, this.onClickAddTreeHandler);
            this.$element.off('mouseenter', map, this.onMouseEnterHandler);
            this.$element.off('mouseleave', map, this.onMouseLeaveHandler);
        }
    });
});
