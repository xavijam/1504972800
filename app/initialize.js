var $ = require('jquery');
var Backbone = require('backbone');
window.jQuery = $;
var Flickity = require('flickity');
var DefaultSlideView = require('js/default-slide-view');
var SelectionSlideView = require('js/selection-slide-view');
var BackgroundMapSlideView = require('js/background-map-slide-view');
var ContactView = require('js/contact/contact-view');
require('js/handlebars-helpers');
var isMobile = require('ismobilejs');
var DEFAULT_TITLE = 'Javi ❥ Lau';

document.addEventListener('DOMContentLoaded', init);

function init () {
  var initialization = true;

  var Carousel = new Flickity( '.js-carousel', {
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
      index: 0,
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
      index: 1,
      background: '#905E81',
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
      index: 2,
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
      index: 3,
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
      index: 4,
      background: '#767676',
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
      index: 5,
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
      index: 6,
      background: '#FAFAFA',
      translateKey: 'contact'
    })
    .render().el
  );
  items.add({
    key: Handlebars.helpers.t('contact.key')
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

    document.title = DEFAULT_TITLE + ' · ' + $(currentElement).data('title');
  });
}