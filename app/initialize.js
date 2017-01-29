var $ = require('jquery');
var Backbone = require('backbone');
global.jQuery = $;
require('protip');
var DefaultView = require('js/default-view');
var DEFAULT_TITLE = 'Javi ❥ Lau';
var NavigationView = require('js/navigation-view');
var Reveal = require('reveal');
require('js/handlebars-helpers');


document.addEventListener('DOMContentLoaded', init);

function init () {
  // Render templates
  var $slides = $('#slides');

  // Home
  var view = new DefaultView({
    template: require('templates/home.hbs'),
    background: '#97BDBB',
    translateKey: 'home'
  });
  $slides.append(view.render().el);

  // Transport going
  var view = new DefaultView({
    template: require('templates/transport-going.hbs'),
    background: '#E2AB49',
    translateKey: 'transport-going'
  });
  $slides.append(view.render().el);

  // Church
  var view = new DefaultView({
    template: require('templates/church.hbs'),
    background: '#6C818E',
    translateKey: 'church'
  });
  $slides.append(view.render().el);

  // Banquet
  var view = new DefaultView({
    template: require('templates/banquet.hbs'),
    background: '#FA8072',
    translateKey: 'banquet'
  });
  $slides.append(view.render().el);


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

  Reveal.addEventListener('slidechanged', function (event) {
    document.title = DEFAULT_TITLE + ' · ' + $(event.currentSlide).data('title');
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