var $ = require('jquery');
var Backbone = require('backbone');
window.jQuery = $;
var DefaultSlideView = require('js/default-slide-view');
var SelectionSlideView = require('js/selection-slide-view');
var BackgroundMapSlideView = require('js/background-map-slide-view');
var ContactView = require('js/contact/contact-view');
var NavigationMenuView = require('js/navigation-menu-view');
require('js/handlebars-helpers');
var DEFAULT_TITLE = 'Javi ❥ Lau';

document.addEventListener('DOMContentLoaded', init);

function init () {
  var $slide = $('.js-carousel');
  
  var homeSlide = new DefaultSlideView({
    template: require('templates/home.hbs'),
    index: 0,
    background: '#97BDBB',
    translateKey: 'home'
  });

  var transportGoingSlide = new SelectionSlideView({
    template: require('templates/transport-going.hbs'),
    selectionItemTemplate: require('./templates/route-options.hbs'),
    selectionItemListClassname: 'List--horizontal',
    index: 1,
    background: '#6C818E',
    translateKey: 'transport-going',
    addDescription: true,
    selectPlaceholder: Handlebars.helpers.t('transport-going.placeholder'),
    selectionItems: require('js/transport-going-routes')
  });

  var churchSlide = new DefaultSlideView({
    template: require('templates/church.hbs'),
    index: 2,
    background: '#75A068',
    translateKey: 'church'
  });

  var banquetSlide = new DefaultSlideView({
    template: require('templates/banquet.hbs'),
    index: 3,
    background: '#E3AA45',
    translateKey: 'banquet'
  });

  var transportReturnSlide = new SelectionSlideView({
    template: require('templates/transport-return.hbs'),
    selectionItemTemplate: require('./templates/route-options.hbs'),
    selectionItemListClassname: 'List--horizontal',
    index: 4,
    background: '#DF8075',
    addDescription: true,
    selectPlaceholder: Handlebars.helpers.t('transport-return.placeholder'),
    translateKey: 'transport-return',
    selectionItems: require('js/transport-return-routes')
  });

  var accomodationSlide = new SelectionSlideView({
    template: require('templates/accomodation.hbs'),
    selectionItemTemplate: require('./templates/accomodation-options.hbs'),
    selectionItemListClassname: 'List--vertical',
    index: 5,
    background: '#60A7A4',
    translateKey: 'accomodation',
    addDescription: false,
    selectPlaceholder: Handlebars.helpers.t('accomodation.placeholder'),
    selectionItems: require('js/accomodation-options')
  });

  var honeymoonSlide = new BackgroundMapSlideView({
    template: require('templates/honeymoon.hbs'),
    index: 6,
    background: '#FFF',
    translateKey: 'honeymoon'
  });

  var confirmationSlide = new ContactView({
    template: require('templates/contact/contact-slide.hbs'),
    index: 7,
    background: '#DDD',
    translateKey: 'contact'
  });
  
  var slides = new Backbone.Collection([
    { key: Handlebars.helpers.t('home.key') },
    { key: Handlebars.helpers.t('transport-going.key') },
    { key: Handlebars.helpers.t('church.key') },
    { key: Handlebars.helpers.t('banquet.key') },
    { key: Handlebars.helpers.t('transport-return.key') },
    { key: Handlebars.helpers.t('accomodation.key') },
    { key: Handlebars.helpers.t('honeymoon.key') },
    { key: Handlebars.helpers.t('contact.key') }
  ]);

  // Add navigation menu
  var menuView = new NavigationMenuView({
    $canvas: $('.js-canvas'),
    collection: slides
  });
  $('.js-canvas').append(menuView.render().el);

  var AppRouter = Backbone.Router.extend({
    routes: {
      'transport-going': '_transportGoingRoute',
      'transporte-ida': '_transportGoingRoute',
      'church': '_churchRoute',
      'iglesia': '_churchRoute',
      'banquet': '_banquetRoute',
      'banquete': '_banquetRoute',
      'accomodation': '_accomodationRoute',
      'hoteles': '_accomodationRoute',
      'transport-return': '_transportReturnRoute',
      'transporte-vuelta': '_transportReturnRoute',
      'viaje': '_honeymoonRoute',
      'honeymoon': '_honeymoonRoute',
      'confirmacion': '_confirmationRoute',
      'confirmation': '_confirmationRoute',
      '*defaultRoute': '_homeRoute'
    },

    _homeRoute: function () { this._renderView(homeSlide); },
    _churchRoute: function () { this._renderView(churchSlide); },
    _banquetRoute: function () { this._renderView(banquetSlide); },
    _accomodationRoute: function () { this._renderView(accomodationSlide); },
    _transportGoingRoute: function () { this._renderView(transportGoingSlide); },
    _transportReturnRoute: function () { this._renderView(transportReturnSlide); },
    _honeymoonRoute: function () { this._renderView(honeymoonSlide); },
    _confirmationRoute: function () { this._renderView(confirmationSlide); },
    _renderView: function (view) { $slide.html(view.render().el); }
  });

  var router = new AppRouter();
  Backbone.history.start({ pushState: true });
}