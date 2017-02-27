/**
 *  Attendees list view
 */

var Backbone = require('backbone');
var AttendeeItemView = require('./attendee-item-view');

module.exports = Backbone.View.extend({

  tagName: 'ul',

  initialize: function () {
    this.listenTo(this.collection, 'add', this._renderAttendee);
  },

  render: function () {
    this.collection.each(this._renderAttendee.bind(this));
    return this;
  },

  _renderAttendee: function (mdl) {
    var attendeeView = new AttendeeItemView({
      collection: this.collection,
      model: mdl
    });
    this.$el.append(attendeeView.render().el);
  }

});