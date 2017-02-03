// Default and no more js view
var Backbone = require('backbone');
var $ = require('jquery');
var DEFAULT_TITLE = 'Javi ❥ Lau';

module.exports = Backbone.View.extend({

  tagName: 'div',
  className: 'carousel-cell Slide',

  initialize: function (opts) {
    this.options = opts;
    this._initBinds();
  },

  render: function () {
    var template = this.options.template;

    this.$el.html(template({}));
    
    this.$el.attr({
      'id': Handlebars.helpers.t(this.options.translateKey + '.key'),
      'data-background': this.options.background,
      'data-title': Handlebars.helpers.t(this.options.translateKey + '.title')
    });

    this.$el.css('background-color', this.options.background);

    this._initViews();

    return this;
  },

  _initBinds: function () {
    // Reveal.addEventListener('ready', function (event) {
    //   this._checkCurrentSlide(event);
    //   Reveal.addEventListener('slidechanged', this._checkCurrentSlide.bind(this));
    // }.bind(this));
  },

  _openTip: function () {
    this.$('.js-comments').protipShow();
  },

  _hideTip: function () {
    this.$('.js-comments').protipHide();
  },

  _checkCurrentSlide: function (event) {
    if (event.indexh === this.options.index) {
      setTimeout(this._openTip.bind(this), 2000);
      document.title = DEFAULT_TITLE + ' · ' + $(event.currentSlide).data('title');
    } else {
      this._hideTip();
    }
  },

  _initViews: function () {}

});