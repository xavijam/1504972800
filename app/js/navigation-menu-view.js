var $ = require('jquery');
var Backbone = require('backbone');

/**
 *  Menu for changing slides or language
 */

module.exports = Backbone.View.extend({

  className: 'Navigation-menu',

  events: {
    'click .js-button': '_onButtonClicked'
  },

  initialize: function () {
    this.model = new Backbone.Model({
      visible: false
    });
    this._checkDocumentClick = this._checkDocumentClick.bind(this);
    this._initBinds();
  },

  render: function () {
    var $button = $('<button>').addClass('Navigation-menuButton js-button');
    $button.append(
      $('<i>').addClass('fa fa-bars')
    );
    this.$el.append($button);
    this.$el.append(this._createMenu());
    return this;
  },

  _initBinds: function () {
    this.listenTo(this.model, 'change:visible', function (model, isVisible) {
      isVisible ? this._showMenu() : this._hideMenu();
    });
  },

  _onButtonClicked: function () {
    this.model.set('visible', !this.model.get('visible'));
  },

  _createMenu: function () {
    var $menu = $('<ul>').addClass('Navigation-menuDropdown js-menu');
    this.collection.each(function (item) {
      $menu.append(
        $('<li>')
          .append(
            $('<a>')
              .addClass('Navigation-menuDropdownItem')
              .html(item.get('key'))
              .attr('href', '#/' + item.get('key'))
        )
      );
    });

    // Add other language
    var locale = global.locale === 'ES' ? 'EN' : 'ES';

    $menu.append(
      $('<li>')
        .append(
          $('<a>')
            .addClass('Navigation-menuDropdownItem')
            .html('<i class="fa fa-globe"></i> ' + locale)
            .attr('href', '?lang=' + locale)
      )
    );

    return $menu;
  },

  _getMenu: function () {
    return this.$('.js-menu');
  },

  _showMenu: function () {
    this._getMenu().addClass('is-visible');
    $(document).on('click', this._checkDocumentClick);
  },

  _hideMenu: function () {
    this._getMenu().removeClass('is-visible');
    $(document).off('click', this._checkDocumentClick);
  },

  _checkDocumentClick: function (ev) {
    var $target = $(ev.target);
    if (!$target.closest('.js-menu').length && !$target.closest('.js-button').length) {
      this.model.set('visible', false);
    }
  }

});