/**
 *  Attendee model
 */
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  defaults: {
    name: '',
    allergy: ''
  }
});