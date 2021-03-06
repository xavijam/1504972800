/**
 *  Attendee item view
 */

var _ = require('underscore');
var Backbone = require('backbone');
var template = require('../../templates/contact/attendee-item.hbs');
require('select2');

module.exports = Backbone.View.extend({

  tagName: 'li',
  className: 'u-bSpace--m',

  events: {
    'change .js-allergy': '_onChange',
    'focusout .js-name': '_onChange',
    'click .js-remove': '_onRemove'
  },

  initialize: function (opts) {
    this._onChange = _.debounce(this._onChange, 500);
    this.stateModel = opts.stateModel;
  },

  render: function () {
    this.$el.html(
      template({
        index: this.collection.indexOf(this.model),
        name: this.model.get('name'),
        allergy: this.model.get('allergy'),
        state: this.stateModel.get('state')
      })
    );

    this._initViews();
    return this;
  },

  _initViews: function () {
    this.$('.js-allergy')
      .select2({
        placeholder: 'placeholder',
        minimumResultsForSearch: Infinity
      })
      .val(this.model.get('allergy')).trigger('change');
  },

  _onChange: function () {
    this.model.set({
      name: this.$('.js-name').val(),
      allergy: this.$('.js-allergy').val()
    })
  },

  _onRemove: function () {
    this.collection.remove(this.model);
    this.remove();
  }

});