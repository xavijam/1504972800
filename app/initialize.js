var $ = require('jquery');
var Backbone = require('backbone');
global.jQuery = $;
require('protip');
var DefaultSlideView = require('js/default-slide-view');
var TransportSlideView = require('js/transport-slide-view');
var NavigationView = require('js/navigation-view');
var Reveal = require('reveal');
require('js/handlebars-helpers');


document.addEventListener('DOMContentLoaded', init);

function init () {
  // Render templates
  var $slides = $('#slides');

  // Home
  $slides.append(
    new DefaultSlideView({
      template: require('templates/home.hbs'),
      index: 0,
      background: '#97BDBB',
      translateKey: 'home'
    }).render().el
  );

  // Transport going
  $slides.append(
    new TransportSlideView({
      template: require('templates/transport-going.hbs'),
      index: 1,
      background: '#E2AB49',
      translateKey: 'transport-going',
      routeOptions: require('js/transport-going-routes')
    }).render().el
  );

  // Church
  $slides.append(
    new DefaultSlideView({
      template: require('templates/church.hbs'),
      index: 2,
      background: '#6C818E',
      translateKey: 'church'
    })
    .render().el
  );

  // Banquet
  $slides.append(
    new DefaultSlideView({
      template: require('templates/banquet.hbs'),
      index: 3,
      background: '#FA8072',
      translateKey: 'banquet'
    })
    .render().el
  );

  Reveal.initialize({
    controls: false,
    progress: false,
    slideNumber: false,
    history: true,
    keyboard: true,
    overview: false,
    center: false,
    touch: true,
    loop: true,
    rtl: false,
    shuffle: false,
    fragments: true,
    embedded: false,
    help: false,
    showNotes: false,
    autoSlide: 0,
    minScale: 1,
    maxScale: 1,
    mouseWheel: false,
    hideAddressBar: false,
    previewLinks: false,
    transition: 'linear'
  });

  var slides = [];
  $('.reveal section').each(function (i, el) {
    slides.push($(el).data('title'));
  });

  var navigation = new NavigationView({
    slides: slides
  });
  $('.js-navigation').append(navigation.render().el);
}