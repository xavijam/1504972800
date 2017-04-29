/**
 *  Contact form view
 */

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var LocalStorage = require('local-storage');
var AttendeesCollection = require('./attendees-collection');
var ContactInfoModel = require('./contact-info-model');
var AttendeesView = require('./attendees-view');
var transportGoingRoutes = require('../transport-going-routes');
var transportReturnRoutes = require('../transport-return-routes');
var template = require('../../templates/contact/contact-form');
var ACTION_URL = 'https://api.formbucket.com/f/buk_muTv1UNBFiCMh8ZYSS7HmXB1';

module.exports = Backbone.View.extend({

  tagName: 'form',
  className: 'Contact',

  events: {
    'focusout .js-email': '_setContactInfoModel',
    'focusout .js-phone': '_setContactInfoModel',
    'focusout .js-song': '_setContactInfoModel',
    'change .js-return': '_setContactInfoModel',
    'change .js-going': '_setContactInfoModel',
    'submit': '_onSubmit'
  },

  initialize: function () {
    var storedAttendees = LocalStorage('contact.attendees');
    var storedInputValue = LocalStorage('contact.data');
    this.model = new Backbone.Model({ state: 'idle' });
    this.contactInfoModel = new ContactInfoModel(storedInputValue);
    this.collection = new AttendeesCollection(storedAttendees, { parse: true });
    this._initBinds();
  },

  render: function () {
    this.undelegateEvents();
    this.$el.html(
      template({
        state: this.model.get('state'),
        phone: this.contactInfoModel.get('phone'),
        email: this.contactInfoModel.get('email'),
        song: this.contactInfoModel.get('song')
      })
    );
    this._initViews();
    this.delegateEvents();
    return this;
  },

  _initBinds: function () {
    this.listenTo(this.model, 'change:state', this.render);
    this.listenTo(this.contactInfoModel, 'change', this._setLocalStorage);
    this.listenTo(this.collection, 'add remove change reset', this._setLocalStorage);
  },

  _initViews: function () {
    // Attendees view
    var attendeesView = new AttendeesView({
      collection: this.collection,
      stateModel: this.model
    });
    this.$('.js-attendees').append(attendeesView.render().el);

    // Render buses form
    this._renderCustomSelect('js-going', transportGoingRoutes, 'transport-going', this.contactInfoModel.get('transport_going'));
    this._renderCustomSelect('js-return', transportReturnRoutes, 'transport-return', this.contactInfoModel.get('transport_return'));
  },

  _setContactInfoModel: function () {
    this.contactInfoModel.set({
      transport_going: this.$('.js-going').val(),
      transport_return: this.$('.js-return').val(),
      phone: this.$('.js-phone').val(),
      email: this.$('.js-email').val(),
      song: this.$('.js-song').val()
    });
  },

  _setLocalStorage: function () {
    LocalStorage('contact.attendees', this.collection.toJSON());
    LocalStorage('contact.data', {
      transport_going: this.contactInfoModel.get('transport_going'),
      transport_return: this.contactInfoModel.get('transport_return'),
      phone: this.contactInfoModel.get('phone'),
      email: this.contactInfoModel.get('email'),
      song: this.contactInfoModel.get('song')
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

  _clearContactInfo: function () {
    this.collection.reset([]);
    this.contactInfoModel.clear();
  },

  _animatePlane: function () {
    $('.js-contactIcon').addClass('flyaway popUp');
  },

  _sendForm: function () {
    var contactInfo = this.contactInfoModel.toJSON();
    var attendeesInfo = {};
    this.collection.each(function (item, i) {
      attendeesInfo['name' + i] = item.get('name');
      attendeesInfo['allergy' + i] = item.get('allergy');
    }, this);
    this.model.set('state', 'loading');

    $.ajax({
      url: ACTION_URL,
      method: 'POST',
      data: _.extend(
        attendeesInfo,
        contactInfo
      ),
      dataType: 'json',
      success: function () {
        this._animatePlane();
        this._clearContactInfo();
        this.model.set('state', 'success');
      }.bind(this),
      error: function () {
        this.model.set('state', 'error');
      }.bind(this)
    });
  }

});