/**
 *  Accomodation slide view
 */
var $ = require('jquery');
var SelectionSlideView = require('./selection-slide-view');

module.exports = SelectionSlideView.extend({

  // Credit: https://codepen.io/TomMcPadden/pen/yAblG
  _snore: function snore() {
    var $icon = this.$('.js-icon');
    var iconOffset = $icon.offset();
    var elm = document.createElement('span');
    elm.innerText = 'Z';
    elm.setAttribute('class', 'Animation-z');
    var posTop = iconOffset.top + 20;
    var posLeft = iconOffset.left + ($icon.width() / 2) + 35;
    var aniTop = posTop - 160;
    var aniLeft = (posLeft - 40) + Math.round(Math.random() * 80);

    $(elm).css({
      top: posTop,
      left: posLeft
    });

    $icon.parent().append(elm);

    $(elm).animate({
      top: aniTop,
      left: aniLeft,
      'font-size': "60px",
       opacity: 0
      },
      5000,
      function() {
        $(this).remove();
      }
    );
  },

  _startAnimation: function () {
    if (this._snoreInterval) {
      return false;
    }

    this._snoreInterval = setInterval(this._snore.bind(this), 1000);
    this._snore();
  },

  _stopAnimation: function () {
    clearInterval(this._snoreInterval);
    delete this._snoreInterval;
  },

  _checkCurrentSlide: function () {
    this._animationStarted = false;
    SelectionSlideView.prototype._checkCurrentSlide.apply(this);
  }

});