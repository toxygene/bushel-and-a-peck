define(function(require) {
    "use strict";

    var BaseComponent = require('components/BaseComponent');
    var find = require('mout/array/find');
    var forEach = require('mout/array/forEach');
    var GetJson = require('utils/GetJson');
    var inheritPrototype = require('mout/lang/inheritPrototype');
    var ko = require('knockout');
    var L = require('leaflet');
    var map = require('mout/array/map');
    var VarietiesControlLayer = require('components/TreeVarietiesMap/VarietiesControlLayer');
    var VarietiesViewModel = require('view-models/VarietiesViewModel');

    /**
     * Map component
     *
     * @constuctor
     * @param {jQuery} $element
     * @param {Object} options
     */
    var Map = function($element, options) {
        BaseComponent.call(this, $element, options);

        this.varietiesViewModel = new VarietiesViewModel();
    };

    Map.SELECTOR = '.js-map';

    var proto = inheritPrototype(Map, BaseComponent);

    /**
     * Create the map and add the tile and variety layers
     *
     * @chainable
     */
    proto.createChildren = function() {
        this.map = L.map(
            this.$element.get(0),
            {
                center: [this.$element.data('latitude'), this.$element.data('longitude')],
                zoom: this.$element.data('zoom')
            }
        );

        this.map.addLayer(
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'toxygene.nadn5mm9',
                accessToken: 'pk.eyJ1IjoidG94eWdlbmUiLCJhIjoiRjZQLTBrTSJ9.g8_WRX9WFPs9t5gAdYiaDA'
            })
        );

        this.varietiesControlLayer = new VarietiesControlLayer(this.varietiesViewModel);

        this.map.addLayer(this.varietiesControlLayer);

        return this;
    };

    /**
     * Create the handlers for the component
     *
     * @chainable
     */
    proto.createHandlers = function() {
        this.addVarietyHandler = this.addVariety.bind(this);
        this.onVarietiesLoadedHandler = this.onVarietiesLoaded.bind(this);

        return this;
    };

    /**
     * Enable the component
     *
     * @chainable
     */
    proto.enable = function() {
        this.loadVarieties();
        
        return this;
    };

    /**
     * Load the varieties from the API endpoint
     *
     * @return {Promise}
     */
    proto.loadVarieties = function() {
        return GetJson('api.json').then(this.onVarietiesLoadedHandler);
    };
    
    /**
     * XHR handler for successful loading of variety data
     *
     * @param {array} results
     */
    proto.onVarietiesLoaded = function(results) {
        forEach(
            results.data,
            this.addVarietyHandler
        );
    };

    proto.addVariety = function(variety) {
        this.varietiesViewModel.addVarietyData(variety);
        return this;
    };

    return Map;
});
