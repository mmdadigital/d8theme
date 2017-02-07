(function (Drupal) {

  'use strict';

  Drupal.behaviors.mmda_svg4everybody = {
    attach: function (context, settings) {
      svg4everybody();
    }
  };

})(Drupal);
