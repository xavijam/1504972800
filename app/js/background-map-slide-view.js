/**
 *  Background map view
 */

var _ = require('underscore');
var L = require('leaflet');
var $ = require('jquery');
var DefaultSlideView = require('./default-slide-view');
var TravelItems = require('./travel-items.js');
var HoneymoonFormView = require('./honeymoon-form-view');
var QUERY_TEMPLATE = _.template('http://xavijam.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT the_geom FROM <%= tableName %>');

module.exports = DefaultSlideView.extend({

  render: function () {
    var template = this.options.template;

    this.$el.html(
      template({
        items: TravelItems
      })
    );
    
    this.$el.attr({
      'id': Handlebars.helpers.t(this.options.translateKey + '.key'),
      'data-background': this.options.background,
      'data-title': Handlebars.helpers.t(this.options.translateKey + '.title'),
      'data-key': Handlebars.helpers.t(this.options.translateKey + '.key'),
      'data-index': this.options.index
    });

    this.$el.css('background-color', this.options.background);

    this._initViews();
    setTimeout(this._initMap.bind(this), 0);

    return this;
  },

  _initMap: function () {
    var map = L.map('js-map', {
      doubleClickZoom: false,
      boxZoom: false,
      dragging: false,
      attributionControl: false,
      zoomControl: false,
      scrollWheelZoom: false,
      touchZoom: false,
      keyboard: false
    }).setView([-40.823163, 171.595703], 6);

    var polygonStyle = {
      color: '#E6E6E6',
      weight: 1,
      opacity: 0.65
    };

    var markerStyle = {
      radius: 4,
      fillColor: '#DF685C',
      color: '#FFFFFF',
      weight: 2,
      opacity: 1,
      fillOpacity: 1
    };

    var lineStyle = {
      color: '#314c96',
      weight: 2,
      opacity: 0.3,
    };

    var loadPoints = function () {
      $.getJSON(QUERY_TEMPLATE({ tableName: 'pois_nueva_zelanda' }), function(data) {
        L.geoJson(data, {
          pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, markerStyle);
          },
          onEachFeature: function () {}
        }).addTo(map);
      });
    };

    $.getJSON(QUERY_TEMPLATE({ tableName: "oceania where iso_alpha3='NZL'" }), function(data) {
      L.geoJson(data, {
        style: polygonStyle
      }).addTo(map);

      var onLineLoaded = _.after(3, loadPoints);

      $.getJSON(QUERY_TEMPLATE({ tableName: 'indicaciones_de_taupo_a_blue_pools_walk' }), function(data) {
        L.geoJson(data, {
          style: lineStyle
        }).addTo(map);

        onLineLoaded();
      });

      $.getJSON(QUERY_TEMPLATE({ tableName: 'indicaciones_de_sky_tower_a_taupo' }), function(data) {
        L.geoJson(data, {
          style: lineStyle
        }).addTo(map);

        onLineLoaded();
      });

       $.getJSON(QUERY_TEMPLATE({ tableName: 'indicaciones_de_blue_pools_walk_a_kaikoura' }), function(data) {
        L.geoJson(data, {
          style: lineStyle
        }).addTo(map);

        onLineLoaded();
      });
    });
  },

  _initViews: function () {
    var form = new HoneymoonFormView();
    this.$('.Slide-content').append(form.render().el)
  }

});