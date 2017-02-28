var Backbone = require('backbone');

// Contact info default model

module.exports = Backbone.Model.extend({

  defaults: {
    song: '',
    email: '',
    phone: '',
    transport_going: '',
    transport_return: ''
  }

});