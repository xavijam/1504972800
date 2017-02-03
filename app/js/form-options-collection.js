/**
 *  Collection for form options
 */

var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({

  setSelected: function (name) {
    var currentSelectedItem = this.getSelected();
    if (currentSelectedItem) {
      currentSelectedItem.attributes.selected = false;
    }

    var newSelectedItem = this.findWhere({ name: name });
    newSelectedItem.set('selected', true);
  },

  getSelected: function () {
    return this.findWhere({ selected: true });
  },

  getSelectedCategory: function () {
    var selectedItem = this.getSelected();
    return selectedItem.get('category');
  }

});