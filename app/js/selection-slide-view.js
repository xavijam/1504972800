/**
 *  Selection slide view, for transport, accomodation,...
 */

var DefaultSlideView = require('./default-slide-view');
var SelectionFormView = require('./selection-form-view');

module.exports = DefaultSlideView.extend({

  _initViews: function () {
    if (this.options.selectionItems) {
      var view = new SelectionFormView({
        selectionItemTemplate: this.options.selectionItemTemplate,
        selectionItemListClassname: this.options.selectionItemListClassname,
        selectionItems: this.options.selectionItems
      });
      this.$('.Slide-content').append(view.render().el);
    }
  }

});