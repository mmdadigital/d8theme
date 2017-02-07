/**
 * @file
 * A JavaScript file for the theme.
 *
 * This JavaScript file is loaded on all Pages.
 */

(function($) {
  Drupal.behaviors.teka_mmda = {
    attach: function (context, settings) {
      // Object fit support for IE and EDGE.
      if (!Modernizr.objectfit) {
        $('.parallax-hero-trigger .parallax-image').find('.field--name-field-image').addClass('js-no-objectfit');
        $('.node--type-service.node--view-mode-teaser').find('.field--name-field-image').addClass('js-no-objectfit');

        $('.js-no-objectfit').each(function (index, value) {
          var $img = $(this).find('img');
          var $imgUrl = '';
          if ($img.prop('src')) {
            $imgUrl = $img.prop('src');
          }
          else if ($img.prop('currentSrc')) {
            $imgUrl = $img.prop('currentSrc');
          }
          if ($imgUrl) {
            $(this).css('background-image', 'url(' + $imgUrl + ')');
          }
          $img.hide();
        });
      }

      /// detect iphone user agent and add class on html
      Modernizr.addTest('iphone', function() {
          return !!navigator.userAgent.match(/iPhone/i);
      });

      if (Modernizr.iphone) {
        //this adds ios class to body
        Modernizr.prefixed('iphone');
      }

    },
  };
})(jQuery, Modernizr);
