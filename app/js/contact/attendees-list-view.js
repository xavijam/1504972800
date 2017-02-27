/**
 *  Attendees list view
 */

var Backbone = require('backbone');
var AttendeeItemView = require('./attendee-item-view');

module.exports = Backbone.View.extend({

  tagName: 'ul',

  initialize: function () {
    this.listenTo(this.collection, 'add', this._renderAttendee);
    // this.listenTo(this.collection, 'change', this._storeInfo);
  },

  render: function () {
    this.collection.each(this._renderAttendee);
    return this;
  },

  _renderAttendee: function (mdl) {
    var attendeeView = new AttendeeItemView({
      model: mdl
    });
    this.$el.append(attendeeView.render().el);
  }

});