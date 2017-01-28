var Backbone = require('backbone');
var $ = require('jquery');
var template = require('../templates/navigation.hbs');
var Reveal = require('reveal');

module.exports = Backbone.View.extend({

  tagName: 'ul',
  className: 'Navigation-list',

  events: {
    'click .js-slideButton': '_onButtonClick'
  },

  initialize: function (opts) {
    this.options = opts;
    this._initBinds();
  },

  render: function () {
    // Remove all protips containers
    $('.protip-container').remove();

    var selectedSlide = Reveal.getIndices().h;
    this.$el.html(
      template({
        slides: this.options.slides,
        selectedSlide: Reveal.getIndices().h
      })
    );

    this.$el.toggleClass('is-dark', selectedSlide === 6);

    $.protip({
      selector: '.js-slideButton',
      observer: true
    });

    return this;
  },

  _initBinds: function () {
    Reveal.addEventListener('slidechanged', this.render.bind(this));
  },

  _onButtonClick: function (ev) {
    var $el = $(ev.target);
    var slideNumber = $el.data('slide');
    Reveal.slide(slideNumber);
  }

});