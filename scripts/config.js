requirejs.config({
    paths: {
        handlebars: '../bower_components/handlebars/handlebars.runtime.amd',
        jquery: '../bower_components/jquery/dist/jquery',
        knockout: '../bower_components/knockout/dist/knockout',
        leaflet: '../bower_components/leaflet/dist/leaflet',
        mout: '../bower_components/mout/src',
        orbit: '../bower_components/orbit.js/orbit.amd.min',
        rsvp: '../bower_components/rsvp/rsvp.min'
    }
});

requirejs(['App', 'jquery'], function(App, $) {
    new App($('body')).run();
});
