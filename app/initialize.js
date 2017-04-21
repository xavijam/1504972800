var $ = require('jquery');
var Backbone = require('backbone');
window.jQuery = $;
var Flickity = require('flickity');
var DefaultSlideView = require('js/default-slide-view');
var SelectionSlideView = require('js/selection-slide-view');
var BackgroundMapSlideView = require('js/background-map-slide-view');
var ContactView = require('js/contact/contact-view');
var NavigationMenuView = require('js/navigation-menu-view');
require('js/handlebars-helpers');
var isMobile = require('ismobilejs');
var DEFAULT_TITLE = 'Javi ❥ Lau';

document.addEventListener('DOMContentLoaded', init);

function init () {
  var initialization = true;

  var Carousel = new Flickity( '.js-carousel', {
    cellAlign: 'center',
    percentPosition: false,
    dragThreshold: 60,
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
    key: Handlebars.helpers.t('church.key'),
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
    new SelectionSlideView({
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
    collection: items
  });
  $('.js-carousel').append(menuView.render().el);

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
      "*actions": "defaultRoute"
    }
  });
  var router = new AppRouter;

  router.on('route:defaultRoute', function(action) {
    var item = items.findWhere({ key: action });
    var itemIndex = items.indexOf(item);

    if (itemIndex >= 0) {
      if (Carousel) {
        Carousel.select(itemIndex, false, initialization);
      }
    }

    initialization = false;
  });
  Backbone.history.start();

  Carousel.$element.on('select.flickity', function () {
    var currentElement = Carousel.selectedCell.element;
    var key = $(currentElement).data('key');
    router.navigate('#/' + key, { trigger: false });
  });
}