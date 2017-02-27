/**
 *  Selection slide view, for transport, accomodation,...
 */

var Backbone = require('backbone');
var template = require('../templates/selection-form.hbs');
var FormOptionsCollection = require('./form-options-collection');
var _ = require('underscore');
var $ = require('jquery');
require('select2');

module.exports = Backbone.View.extend({

  tagName: 'form',
  className: 'ItemsForm js-selectionForm light-theme',

  events: {
    'change .js-select': '_onSelectChange'
  },

  initialize: function (options) {
    this.collection = new FormOptionsCollection(options.selectionItems);
    this.itemTemplate = options.selectionItemTemplate;
    this.selectionItemListClassname = options.selectionItemListClassname;
    this.selectPlaceholder = options.selectPlaceholder;
    this.addDescription = options.addDescription;
    this._initBinds();
  },

  render: function () {
    var optionsCollection = new Backbone.Collection();
    this.$el.append(template());
    var $select = this.$('.js-select');

    $select.append($('<option>'));
    this.collection.each(function (item) {
      if (!optionsCollection.findWhere({ name: item.get('name') })) {
        optionsCollection.add({ name: item.get('name') });
        var desc = item.get('desc') ? ' (' + item.get('desc') + ')' : '';
        var $option = $('<option>')
          .val(item.get('name'))
          .text(item.get('name') + (this.addDescription ? desc : ''));
        $select.append($option);
      }
    }, this);

    if (this.selectionItemListClassname) {
      this.$('.js-list').addClass(this.selectionItemListClassname);
    }

    $select.select2({
      placeholder: this.selectPlaceholder,
      minimumResultsForSearch: Infinity
    });

    return this;
  },

  _initBinds: function () {
    this.listenTo(this.collection, 'change:selected', this._renderItems);
  },

  _renderItems: function () {
    this.$('.js-list').html(
      this.itemTemplate({
        selectedCategory: this.collection.getSelectedCategory(),
        items: this.collection.toJSON()
      })
    );
  },

  _onSelectChange: function (ev) {
    var value = $(ev.target).val();
    this.collection.setSelected(value);
  }

});