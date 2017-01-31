// Default and no more js view
var Backbone = require('backbone');
var $ = require('jquery');
var Reveal = require('reveal');
var DEFAULT_TITLE = 'Javi ❥ Lau';

module.exports = Backbone.View.extend({

  tagName: 'section',
  className: 'slide Slide',

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

    this._initViews();

    return this;
  },

  _initBinds: function () {
    Reveal.addEventListener('ready', this._checkCurrentSlide.bind(this));
    Reveal.addEventListener('slidechanged', this._checkCurrentSlide.bind(this));
  },

  _openTip: function () {
    $.protip({
      selector: '.js-comments',
      observer: true
    });
  },

  _checkCurrentSlide: function (event) {
    if (event.indexh === this.options.index) {
      setTimeout(this._openTip.bind(this), 1000);
      document.title = DEFAULT_TITLE + ' · ' + $(event.currentSlide).data('title');
    }
  },

  _initViews: function () {}

});