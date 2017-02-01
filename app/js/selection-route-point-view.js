var Backbone = require('backbone');
var template = require('../templates/selection-route-point.hbs');
var RouteOptionsCollection = require('./route-options-collection');
var routeOptionsTemplate = require('../templates/route-options.hbs');
var _ = require('underscore');
var $ = require('jquery');

module.exports = Backbone.View.extend({

  tagName: 'form',
  className: 'RouteForm js-selectionRoutePointForm',

  events: {
    'change .js-pointSelect': '_onSelectChange'
  },

  initialize: function (options) {
    this.collection = new RouteOptionsCollection(options.routePoints);
    this._initBinds();
  },

  render: function () {
    this.$el.append(template());
    var $select = this.$('.js-pointSelect');

    this.collection.each(function (point) {
      var city = point.get('city') ? ' (' + point.get('city') + ')' : '';
      var $option = $('<option>')
        .val(point.get('place'))
        .text(point.get('place') + city);
      $select.append($option);
    });

    $select[0].selectedIndex = -1;
    return this;
  },

  _initBinds: function () {
    this.listenTo(this.collection, 'change:selected', this._renderRoute);
  },

  _renderRoute: function () {
    this.$('.js-routeList').html(
      routeOptionsTemplate({
        selectedRoute: this.collection.getSelectedRoute(),
        routePoints: this.collection.toJSON()
      })
    );
  },

  _onSelectChange: function (ev) {
    var value = $(ev.target).val();
    this.collection.setSelected(value);
  }

});