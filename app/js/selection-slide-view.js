/**
 *  Selection slide view, for transport, accomodation,...
 */

var DefaultSlideView = require('./default-slide-view');
var SelectionFormView = require('./selection-form-view');
var DEFAULT_ITEM_TEMPLATE = require('../templates/route-options.hbs');

module.exports = DefaultSlideView.extend({

  _initViews: function () {
    if (this.options.selectionItems) {
      var view = new SelectionFormView({
        selectionItemTemplate: this.options.selectionItemTemplate || DEFAULT_ITEM_TEMPLATE,
        selectionItems: this.options.selectionItems
      });
      this.$('.Slide-content').append(view.render().el);
    }
  }

});