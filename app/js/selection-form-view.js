/**
 *  Selection slide view, for transport, accomodation,...
 */

var Backbone = require('backbone');
var template = require('../templates/selection-form.hbs');
var FormOptionsCollection = require('./form-options-collection');
var _ = require('underscore');
var $ = require('jquery');

module.exports = Backbone.View.extend({

  tagName: 'form',
  className: 'Form js-selectionForm',

  events: {
    'change .js-select': '_onSelectChange'
  },

  initialize: function (options) {
    this.collection = new FormOptionsCollection(options.selectionItems);
    this.itemTemplate = options.selectionItemTemplate;
    this.selectionItemListClassname = options.selectionItemListClassname;
    this._initBinds();
  },

  render: function () {
    this.$el.append(template());
    var $select = this.$('.js-select');

    this.collection.each(function (item) {
      var desc = item.get('desc') ? ' (' + item.get('desc') + ')' : '';
      var $option = $('<option>')
        .val(item.get('name'))
        .text(item.get('name') + desc);
      $select.append($option);
    });

    if (this.selectionItemListClassname) {
      this.$('.js-list').addClass(this.selectionItemListClassname);
    }

    $select[0].selectedIndex = -1;
    return this;
  },

  _initBinds: function () {
    this.listenTo(this.collection, 'change:selected', this._renderItems);
  },

  _renderItems: function () {
    console.log(this.itemTemplate);
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