var DefaultSlideView = require('./default-slide-view');
var SelectionRoutePointView = require('./selection-route-point-view');

module.exports = DefaultSlideView.extend({

  _initViews: function () {
    if (this.options.routeOptions) {
      var selectionRoutePointView = new SelectionRoutePointView({
        routePoints: this.options.routeOptions
      });
      this.$('.Slide-content').append(selectionRoutePointView.render().el);
    }
  }

});