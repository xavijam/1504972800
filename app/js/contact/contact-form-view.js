/**
 *  Contact form view
 */

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var LocalStorage = require('local-storage');
var AttendeesCollection = require('./attendees-collection');
var AttendeesView = require('./attendees-view');
var transportGoingRoutes = require('../transport-going-routes');
var transportReturnRoutes = require('../transport-return-routes');
var template = require('../../templates/contact/contact-form');

module.exports = Backbone.View.extend({

  tagName: 'form',
  className: 'Contact',

  events: {
    'focusout .js-email': '_setLocalStorage',
    'focusout .js-phone': '_setLocalStorage',
    'focusout .js-song': '_setLocalStorage',
    'change .js-return': '_setLocalStorage',
    'change .js-going': '_setLocalStorage',
    'submit': '_onSubmit'
  },

  initialize: function () {
    var storedAttendees = LocalStorage('contact.attendees') || '';
    this.collection = new AttendeesCollection(storedAttendees, { parse: true });

    this.model = new Backbone.Model({
      state: 'idle'
    });

    this._initBinds();
  },

  render: function () {
    var storedInputValue = LocalStorage('contact.data');

    this.$el.html(
      template({
        phone: storedInputValue.phone,
        email: storedInputValue.email,
        song: storedInputValue.song
      })
    );
    this._initViews();
    return this;
  },

  _initBinds: function () {
    this.listenTo(this.model, 'change:state', this.render);
    this.listenTo(this.collection, 'add remove change', this._setLocalStorage);
  },

  _initViews: function () {
    var storedInputValue = LocalStorage('contact.data');

    // Attendees view
    var attendeesView = new AttendeesView({
      collection: this.collection,
      state: this.model.get('state')
    });
    this.$('.js-attendees').append(attendeesView.render().el);

    // Render buses form
    this._renderCustomSelect('js-going', transportGoingRoutes, 'transport-going', storedInputValue['transport_going']);
    this._renderCustomSelect('js-return', transportReturnRoutes, 'transport-return', storedInputValue['transport_return']);
  },

  _setLocalStorage: function () {
    LocalStorage('contact.attendees', this.collection.toJSON());
    LocalStorage('contact.data', {
      transport_going: this.$('.js-going').val(),
      transport_return: this.$('.js-return').val(),
      phone: this.$('.js-phone').val(),
      email: this.$('.js-email').val(),
      song: this.$('.js-song').val()
    });
  },

  _renderCustomSelect: function (id, data, key, value) {
    var $select = this.$('.' + id);
    $select.append($('<option>')); // For placeholder
    $select.append(
      $('<option>')
        .val(Handlebars.helpers.t('contact.we-dont-need'))
        .text(Handlebars.helpers.t('contact.we-dont-need'))
    ); // For None

    _.each(data, function (item) {
      var desc = item.desc ? ' (' + item.desc + ')' : '';
      var $option = $('<option>')
        .val(item.name)
        .text(item.name + desc);
      $select.append($option);
    }, this);

    $select.select2({
      placeholder: Handlebars.helpers.t('contact.placeholder-' + key),
      minimumResultsForSearch: Infinity
    });

    $select.val(value).trigger('change');
  },

  _reviewForm: function () {
    var phone = this.$('.js-phone').val();
    var email = this.$('.js-email').val();
    var numberAttendees = this.collection.size();
    var validAttendees = this.collection.isValid();

    this.$('.js-phone').toggleClass('has-errors', !phone);
    this.$('.js-email').toggleClass('has-errors', !email);
    this.$('.js-addAttendee').toggleClass('has-errors', !numberAttendees);
    this.$('.js-name').each(function (i, el) {
      $(el).toggleClass('has-errors', !$(el).val());
    });
  },

  _isValid: function () {
    var phone = this.$('.js-phone').val();
    var email = this.$('.js-email').val();
    var numberAttendees = this.collection.size();
    var validAttendees = this.collection.isValid();
    return numberAttendees > 0 && validAttendees && phone && email;
  },

  _onSubmit: function (event) {
    event.stopPropagation();
    event.preventDefault();

    this._reviewForm();

    if (this._isValid()) {
      this._sendForm();
    }
  },

  _sendForm: function () {
    this.model.set('state', 'loading');


  }

});