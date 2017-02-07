(function($) {
  'use strict';
  Drupal.behaviors.teka_mmda_recent_work = {
    attach: function (context, settings) {
      // Implement Slick Slider plugin.
      var $container = $('.view-cases-block.view-display-id-cases_view', context);
      if ($container.length > 0) {

        var $content = $container.find('.view-content');

        var $slick_options = {
          dots: true,
          arrows: false,
          infinite: false
        };

        $(window).resize(function () {
          if (Modernizr.mq('(min-width: 1024px)')) {
            if ($content.hasClass('slick-initialized')) {
              $content.slick('unslick');
            }
          }
          else {
            if (!$content.hasClass('slick-initialized')) {
              $content.slick($slick_options);
            }
          }
        });

        if (!Modernizr.mq('(min-width: 1024px)')) {
          setTimeout(function(){
            $content.slick($slick_options);
          },600);
        }
      }
    }
  };
})(jQuery);
