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
    'submit': '_onSubmit'
  },

  initialize: function () {
    var storedFormValues = LocalStorage('contact.values') || '';
    this.collection = new AttendeesCollection(storedFormValues.attendees, { parse: true });

    this.model = new Backbone.Model({
      state: 'idle'
    });

    this.listenTo(this.model, 'change:state', this.render);
  },

  render: function () {
    this.$el.html(
      template({
        phone: '',
        email: '',
        comment: '',
        song: ''
      })
    );
    this._initViews();
    return this;
  },

  _initViews: function () {
    // Attendees view
    var attendeesView = new AttendeesView({
      collection: this.collection
    });
    this.$('.js-attendees').append(attendeesView.render().el);

    // Render buses form
    this._renderCustomSelect('js-going', transportGoingRoutes);
    this._renderCustomSelect('js-return', transportReturnRoutes);

    // Render sender info (phone, email)
    // Render a song you would like to hear in the wedding
  },

  _renderCustomSelect: function (id, data) {
    var $select = this.$('.' + id);
    $select.append($('<option>')); // For placeholder
    $select.append($('<option>').val('None').text('None')); // For None

    _.each(data, function (item) {
      var desc = item.desc ? ' (' + item.desc + ')' : '';
      var $option = $('<option>')
        .val(item.name)
        .text(item.name + desc);
      $select.append($option);
    }, this);

    $select.select2({
      placeholder: 'hello',
      minimumResultsForSearch: Infinity
    });
  },

  _reviewForm: function () {
    var phone = this.$('.js-phone').val();
    var email = this.$('.js-email').val();
    var numberAttendees = this.collection.size();
    var validAttendees = this.collection.isValid();

    
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