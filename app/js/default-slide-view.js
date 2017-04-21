// Default and no more js view
var Backbone = require('backbone');
var $ = require('jquery');

module.exports = Backbone.View.extend({

  tagName: 'div',
  className: 'carousel-cell Slide',

  initialize: function (opts) {
    this.options = opts;
    this.Carousel = opts.Carousel;
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

  _initBinds: function () {},

  _startAnimation: function () {},

  _initViews: function () {}

});