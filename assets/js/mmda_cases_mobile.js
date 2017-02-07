(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.mmda_cases_mobile = {
    attach: function (context, settings) {

      var $container = $('.case-mobile-demo');

      if($container.length > 0) {
        var $items = $container.find('.field--name-field-mobile-demo-image');

        var $options = {
          dots: true,
          arrows: false,
          mobileFirst: true,
          responsive: [
            {
              breakpoint: 1023,
              settings: {
                slidesToShow: 5,
                centerPadding: 0
              }
            }
          ]
        };

        $items.slick($options);
      }
    }
  };

})(jQuery, Drupal);
