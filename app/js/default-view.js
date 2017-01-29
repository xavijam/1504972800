// Default and no more js view
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  tagName: 'section',
  className: 'slide Slide',

  initialize: function (opts) {
    this.options = opts;
  },

  render: function () {
    var template = this.options.template;
    this.$el.html(template({}));
    this.$el.attr({
      id: Handlebars.helpers.t(this.options.translateKey + '.key'),
      'data-background': this.options.background,
      'data-title': Handlebars.helpers.t(this.options.translateKey + '.title')
    });
    return this;
  }

});