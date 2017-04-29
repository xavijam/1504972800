// Default and no more js view
var Backbone = require('backbone');
var $ = require('jquery');

module.exports = Backbone.View.extend({

  tagName: 'div',
  className: 'carousel-cell Slide',

  initialize: function (opts) {
    this.options = opts;
    this.Carousel = opts.Carousel;
    this._checkCurrentSlide = this._checkCurrentSlide.bind(this);
    this._initBinds();
  },

  render: function () {
    var template = this.options.template;

    this.$el.html(template({}));
    
    this.$el.attr({
      'id': Handlebars.helpers.t(this.options.translateKey + '.key'),
      'data-background': this.options.background,
      'data-title': Handlebars.helpers.t(this.options.translateKey + '.title'),
      'data-key': Handlebars.helpers.t(this.options.translateKey + '.key'),
      'data-index': this.options.index
    });

    this.$el.css('background-color', this.options.background);

    this._initViews();

    return this;
  },

  _initBinds: function () {
    this.Carousel.$element.on('select.flickity', this._checkCurrentSlide);
  },

  _startAnimation: function () {
    this.$('.js-animation').addClass('is-visible');
  },

  _stopAnimation: function () {
    this.$('.js-animation').removeClass('is-visible');
  },

  _checkCurrentSlide: function () {
    var currentElement = this.Carousel.selectedCell.element;
    var elementIndex = $(currentElement).data('index');

    if (elementIndex === this.options.index) {
      setTimeout(this._startAnimation.bind(this), 1000);
    } else {
      this._stopAnimation();
    }
  },

  _initViews: function () {}

});