/**
 *  Contact view
 */

var DefaultSlideView = require('../default-slide-view');
var ContactFormView = require('./contact-form-view');

module.exports = DefaultSlideView.extend({

  _initViews: function () {
    var contactView = new ContactFormView();
    this.$('.js-content').append(contactView.render().el);
  }

});