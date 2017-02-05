/**
 *  Background map view
 */

var DefaultSlideView = require('./default-slide-view');
var TravelItems = require('./travel-items.js');

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
      'data-key': this.options.translateKey,
      'data-index': this.options.index
    });

    this.$el.css('background-color', this.options.background);

    this._initViews();

    return this;
  },

  _initViews: function () {
    
  }

});