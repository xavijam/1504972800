/**
 *  Attendees collection
 */
var Backbone = require('backbone');
var AttendeeModel = require('./attendee-model');

module.exports = Backbone.Collection.extend({
  model: AttendeeModel,

  isValid: function () {
    var validAttendees = true;
    this.each(function (attendee) {
      if (!attendee.get('name')) {
        validAttendees = false;
      }
    }, this);
    return validAttendees;
  }

});