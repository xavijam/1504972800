var $ = require('jquery');
var Backbone = require('backbone');
var Flickity = require('flickity');
global.jQuery = $;
require('protip');
var DefaultSlideView = require('js/default-slide-view');
var TransportSlideView = require('js/transport-slide-view');
require('js/handlebars-helpers');


document.addEventListener('DOMContentLoaded', init);

function init () {
  $.protip();
  
  // Render templates
  var $carousel = $('.js-carousel');

  // Home
  $carousel.append(
    new DefaultSlideView({
      template: require('templates/home.hbs'),
      index: 0,
      background: '#97BDBB',
      translateKey: 'home'
    }).render().el
  );

  // Transport going
  $carousel.append(
    new TransportSlideView({
      template: require('templates/transport-going.hbs'),
      index: 1,
      background: '#E2AB49',
      translateKey: 'transport-going',
      routeOptions: require('js/transport-going-routes')
    }).render().el
  );

  // Church
  $carousel.append(
    new DefaultSlideView({
      template: require('templates/church.hbs'),
      index: 2,
      background: '#6C818E',
      translateKey: 'church'
    })
    .render().el
  );

  // Banquet
  $carousel.append(
    new DefaultSlideView({
      template: require('templates/banquet.hbs'),
      index: 3,
      background: '#FA8072',
      translateKey: 'banquet'
    })
    .render().el
  );

  // Transport return
  $carousel.append(
    new TransportSlideView({
      template: require('templates/transport-return.hbs'),
      index: 4,
      background: '#9B9B9B',
      translateKey: 'transport-return',
      routeOptions: require('js/transport-return-routes')
    })
    .render().el
  );

  var flky = new Flickity( '.carousel', {
    cellAlign: 'center',
    percentPosition: false,
    dragThreshold: 10,
    initialIndex: 0,
    prevNextButtons: false,
    pageDots: true,
    setGallerySize: false,
    contain: true
  });

  console.log(flky);
}