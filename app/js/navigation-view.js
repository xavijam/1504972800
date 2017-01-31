var Backbone = require('backbone');
var $ = require('jquery');
var template = require('../templates/navigation.hbs');
var Reveal = require('reveal');

module.exports = Backbone.View.extend({

  tagName: 'ul',
  className: 'Navigation-list',

  events: {
    'click .js-slideButton': '_onButtonClick',
    'mouseover .js-slideButton': '_onMouseOver',
    'mouseout .js-slideButton': '_onMouseOut'
  },

  initialize: function (opts) {
    this.options = opts;
    this._initBinds();
  },

  render: function () {
    var selectedSlide = Reveal.getIndices().h;
    this.$el.html(
      template({
        slides: this.options.slides,
        selectedSlide: Reveal.getIndices().h
      })
    );

    this.$el.toggleClass('is-dark', selectedSlide === 6);

    return this;
  },

  _initBinds: function () {
    Reveal.addEventListener('slidechanged', this.render.bind(this));
  },

  _onMouseOut: function (ev) {
    var $el = $(ev.target);
    $el.protipHide();
  },

  _onMouseOver: function (ev) {
    var $el = $(ev.target);
    $el.protipShow();
  },

  _onButtonClick: function (ev) {
    var $el = $(ev.target);
    var slideNumber = $el.data('slide');
    $el.protipHide();
    Reveal.slide(slideNumber);
  }

});