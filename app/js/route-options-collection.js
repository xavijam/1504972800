var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({

  setSelected: function (place) {
    var currentSelectedPoint = this.getSelected();
    if (currentSelectedPoint) {
      currentSelectedPoint.attributes.selected = false;
    }

    var newSelectedPoint = this.findWhere({ place: place });
    newSelectedPoint.set('selected', true);
  },

  getSelected: function () {
    return this.findWhere({ selected: true });
  },

  getSelectedRoute: function () {
    var selectedPoint = this.getSelected();
    return selectedPoint.get('route');
  }

});