var $ = require('jquery');
var Backbone = require('backbone');
window.jQuery = $;
var Flickity = require('flickity');
var DefaultSlideView = require('js/default-slide-view');
var SelectionSlideView = require('js/selection-slide-view');
var BackgroundMapSlideView = require('js/background-map-slide-view');
var ContactView = require('js/contact/contact-view');
var AccomodationSlideView = require('js/accomodation-slide-view');
var NavigationMenuView = require('js/navigation-menu-view');
require('js/handlebars-helpers');
var isMobile = require('ismobilejs');
var DEFAULT_TITLE = 'Javi ❥ Lau';

document.addEventListener('DOMContentLoaded', init);

function init () {
  var initialization = true;

  var Carousel = new Flickity('.js-carousel', {
    cellAlign: 'center',
    percentPosition: false,
    dragThreshold: 80,
    prevNextButtons: !isMobile.any,
    pageDots: true,
    setGallerySize: false,
    contain: true,
    wrapAround: true
  });

  // Add slides
  var items = new Backbone.Collection();

  // Home
  Carousel.append(
    new DefaultSlideView({
      Carousel: Carousel,
      template: require('templates/home.hbs'),
      index: 0,
      background: '#97BDBB',
      translateKey: 'home'
    }).render().el
  );
  items.add({
    key: Handlebars.helpers.t('home.key')
  });

  // Transport going
  Carousel.append(
    new SelectionSlideView({
      Carousel: Carousel,
      template: require('templates/transport-going.hbs'),
      selectionItemTemplate: require('./templates/route-options.hbs'),
      selectionItemListClassname: 'List--horizontal',
      index: 1,
      background: '#6C818E',
      translateKey: 'transport-going',
      addDescription: true,
      selectPlaceholder: Handlebars.helpers.t('transport-going.placeholder'),
      selectionItems: require('js/transport-going-routes')
    }).render().el
  );
  items.add({
    key: Handlebars.helpers.t('transport-going.key')
  });

  // Church
  Carousel.append(
    new DefaultSlideView({
      Carousel: Carousel,
      template: require('templates/church.hbs'),
      index: 2,
      background: '#75A068',
      translateKey: 'church'
    })
    .render().el
  );
  items.add({
    key: Handlebars.helpers.t('church.key')
  });

  // Banquet
  Carousel.append(
    new DefaultSlideView({
      Carousel: Carousel,
      template: require('templates/banquet.hbs'),
      index: 3,
      background: '#E3AA45',
      translateKey: 'banquet'
    })
    .render().el
  );
  items.add({
    key: Handlebars.helpers.t('banquet.key')
  });

  // Transport return
  Carousel.append(
    new SelectionSlideView({
      Carousel: Carousel,
      template: require('templates/transport-return.hbs'),
      selectionItemTemplate: require('./templates/route-options.hbs'),
      selectionItemListClassname: 'List--horizontal',
      index: 4,
      background: '#DF8075',
      addDescription: true,
      selectPlaceholder: Handlebars.helpers.t('transport-return.placeholder'),
      translateKey: 'transport-return',
      selectionItems: require('js/transport-return-routes')
    })
    .render().el
  );
  items.add({
    key: Handlebars.helpers.t('transport-return.key')
  });

  // Accomodation
  Carousel.append(
    new AccomodationSlideView({
      Carousel: Carousel,
      template: require('templates/accomodation.hbs'),
      selectionItemTemplate: require('./templates/accomodation-options.hbs'),
      selectionItemListClassname: 'List--vertical',
      index: 5,
      background: '#60A7A4',
      translateKey: 'accomodation',
      addDescription: false,
      selectPlaceholder: Handlebars.helpers.t('accomodation.placeholder'),
      selectionItems: require('js/accomodation-options')
    })
    .render().el
  );
  items.add({
    key: Handlebars.helpers.t('accomodation.key')
  });

  // Honeymoon
  Carousel.append(
    new BackgroundMapSlideView({
      Carousel: Carousel,
      template: require('templates/honeymoon.hbs'),
      index: 6,
      background: '#FFF',
      translateKey: 'honeymoon'
    })
    .render().el
  );
  items.add({
    key: Handlebars.helpers.t('honeymoon.key')
  });

  // Contact
  Carousel.append(
    new ContactView({
      Carousel: Carousel,
      template: require('templates/contact/contact-slide.hbs'),
      index: 7,
      background: '#DDD',
      translateKey: 'contact'
    })
    .render().el
  );
  items.add({
    key: Handlebars.helpers.t('contact.key')
  });

  // Add navigation menu
  var menuView = new NavigationMenuView({
    $canvas: $('.js-canvas'),
    collection: items
  });
  $('.js-canvas').append(menuView.render().el);

  Carousel.$element.on('select.flickity', function () {
    var currentElement = Carousel.selectedCell.element;
    var index = $(currentElement).data('index');
    document.title = DEFAULT_TITLE + ' · ' + $(currentElement).data('title');
    $('.js-appMenu .Navigation-menuDropdown')
      .removeClass('slide-0 slide-1 slide-2 slide-3 slide-4 slide-5')
      .addClass('slide-' + index);
    $('.flickity-page-dots, .js-appMenu').toggleClass('is-light', index === 6 || index === 7);
  });

  // Initiate the router
  var AppRouter = Backbone.Router.extend({
    routes: {
      'transport-going': '_transportGoingSlide',
      'transporte-ida': '_transportGoingSlide',
      'church': '_churchSlide',
      'iglesia': '_churchSlide',
      'banquet': '_banquetSlide',
      'banquete': '_banquetSlide',
      'transporte-vuelta': '_transportReturnSlide',
      'transport-return': '_transportReturnSlide',
      'hoteles': '_accomodationSlide',
      'accomodation': '_accomodationSlide',
      'viaje': '_tripSlide',
      'honeymoon': '_tripSlide',
      'confirmation': '_contactSlide',
      'confirmacion': '_contactSlide',
      '*default': '_homeSlide'
    },

    _homeSlide: function () { this._goToSlide(0); },
    _transportGoingSlide: function () { this._goToSlide(1); },
    _churchSlide: function () { this._goToSlide(2); },
    _banquetSlide: function () { this._goToSlide(3); },
    _transportReturnSlide: function () { this._goToSlide(4); },
    _accomodationSlide: function () { this._goToSlide(5); },
    _tripSlide: function () { this._goToSlide(6); },
    _contactSlide: function () { this._goToSlide(7); },

    _goToSlide: function (slideNumber) {
      if (slideNumber >= 0) {
        if (Carousel) {
          Carousel.select(slideNumber, false, initialization);
        }
      }

      initialization = false;
    }
  });

  var router = new AppRouter();

  Backbone.history.start();

  Carousel.$element.on('select.flickity', function () {
    var currentElement = Carousel.selectedCell.element;
    var key = $(currentElement).data('key');
    router.navigate('#/' + key, { trigger: false });
  });
}
