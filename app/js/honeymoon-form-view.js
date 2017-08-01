/**
 *  Honeymoon form view
 */

var Backbone = require('backbone');
var template = require('../templates/honeymoon-form.hbs');
var LocalStorage = require('local-storage');
var $ = require('jquery');
var ACTION_URL = 'https://api.formbucket.com/f/buk_StZs0p2Ec3GvoJEgFuHMd8sS';

module.exports = Backbone.View.extend({

  tagName: 'form',
  className: 'Form u-tSpace--xxl',

  events: {
    'submit': '_onSubmit',
    'keyup .js-textInput': '_onKeyUp'
  },

  initialize: function () {
    this.model = new Backbone.Model({
      state: 'idle'
    });

    this._initBinds();
  },

  render: function () {
    var storedInputValue = LocalStorage('honeymoon.input') || '';
    this.$el.html(
      template({
        state: this.model.get('state'),
        value: storedInputValue
      })
    );

    return this;
  },

  _initBinds: function () {
    this.listenTo(this.model, 'change:state', this.render);
  },

  _getInputValue: function () {
    return this.$('.js-textInput').val();
  },

  _onKeyUp: function () {
    LocalStorage('honeymoon.input', this._getInputValue());
  },

  _onSubmit: function (ev) {
    ev.preventDefault();
    ev.stopPropagation();

    var state = this.model.get('state');
    var email = this._getInputValue();

    if (state !== 'loading') {
      this.model.set('state', 'loading');

      $.ajax({
        url: ACTION_URL,
        method: 'POST',
        data: { email: email },
        dataType: 'json',
        success: function () {
          this.model.set('state', 'success');
        }.bind(this),
        error: function () {
          this.model.set('state', 'idle');
        }.bind(this)
      });
    }
  }
});
