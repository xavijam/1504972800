var $ = require('jquery');
global.jQuery = $;
require('protip');
var DEFAULT_TITLE = 'Javi ❥ Lau';
var NavigationView = require('js/navigation-view');
var Reveal = require('reveal');
require('js/handlebars-helpers');

var templates = [
  require('templates/home.hbs'),
  require('templates/transport-going.hbs'),
  require('templates/church.hbs'),
  require('templates/banquet.hbs'),
  require('templates/transport-return.hbs'),
  require('templates/accomodation.hbs'),
  require('templates/honeymoon.hbs'),
  require('templates/contact.hbs')
];

document.addEventListener('DOMContentLoaded', init);

function init () {
  // Render templates
  var $slides = $('#slides');
  for (var i = 0, l = templates.length; i < l; i++) {
    $slides.append(
      templates[i]({})
    );
  }

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