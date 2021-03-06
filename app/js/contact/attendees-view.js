/**
 *  Attendees view
 */

var Backbone = require('backbone');
var template = require('../../templates/contact/attendees');
var AttendeesListView = require('./attendees-list-view');

module.exports = Backbone.View.extend({

  events: {
    'click .js-addAttendee': '_addAttendee'
  },

  initialize: function (opts) {
    this.stateModel = opts.stateModel;
  },

  render: function () {
    this.$el.html(
      template({
        state: this.stateModel.get('state')
      })
    );
    this._initViews();
    return this;
  },

  _initViews: function () {
    var attendeesListView = new AttendeesListView({
      collection: this.collection,
      stateModel: this.stateModel
    });
    this.$el.prepend(attendeesListView.render().el);
  },

  _addAttendee: function () {
    this.collection.add({});
  }

});