/**
 *  Attendee item view
 */

var _ = require('underscore');
var Backbone = require('backbone');
var template = require('../../templates/contact/attendee-item.hbs');
require('select2');

module.exports = Backbone.View.extend({

  tagName: 'li',

  events: {
    'change .js-allergy': '_onChange',
    'keyUp .js-name': '_onChange',
    'click .js-remove': 'remove'
  },

  initialize: function () {
    this._onChange = _.debounce(this._onChange, 500);
  },

  render: function () {
    this.$el.html(
      template({
        name: this.model.get('name'),
        allergy: this.model.get('allergy')
      })
    );

    this._initViews();
    return this;
  },

  _initViews: function () {
    this.$('.js-allergy').select2({
      placeholder: 'placeholder',
      minimumResultsForSearch: Infinity
    });
  },

  _onChange: function () {
    this.model.set({
      name: this.$('.js-name').val(),
      allergy: this.$('.js-allergy').val()
    })
  }

});