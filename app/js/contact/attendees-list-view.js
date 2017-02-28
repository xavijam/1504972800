/**
 *  Attendees list view
 */

var Backbone = require('backbone');
var AttendeeItemView = require('./attendee-item-view');

module.exports = Backbone.View.extend({

  tagName: 'ul',

  initialize: function (opts) {
    this.stateModel = opts.stateModel;
    this.listenTo(this.collection, 'add', this._renderAttendee);
  },

  render: function () {
    this.collection.each(this._renderAttendee.bind(this));
    return this;
  },

  _renderAttendee: function (mdl) {
    var attendeeView = new AttendeeItemView({
      collection: this.collection,
      model: mdl,
      stateModel: this.stateModel
    });
    this.$el.append(attendeeView.render().el);
  }

});