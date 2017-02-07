(function($, Drupal) {
  'use strict';

  Drupal.behaviors.teka_mmda_what_we_do = {
    attach: function (context, settings) {
      // Implement Slick Slider plugin.
      var $container = $('.block-views-blockwhat-we-do-block-1', context);

      if ($container.length > 0) {
        var $content = $container.find('.view-content');

        var $slick_options = {
          dots: true,
          appendDots: '.what-we-do__slick-dots .l-container-inner',
          arrows: false,
          infinite: false,
          //useTransform: false,
          fade: true,
          // edgeFriction: 0,
          customPaging: function (slick, index) {
            var $title = slick.$slides.eq(index).find('article').attr('data-title');
            return $title;
          }
        };

        $content.on('afterChange', function(event, slick, currentSlide, nextSlide){
          Drupal.behaviors.teka_mmda_what_we_do.animate_bar_slick();
        });

        $content.on('init', function(slick){
          setTimeout(function(){
            Drupal.behaviors.teka_mmda_what_we_do.animate_bar_slick();
          }, 300);
        });

        $content.on('breakpoint', function(event, slick, breakpoint){
          Drupal.behaviors.teka_mmda_what_we_do.animate_bar_slick();
        });

        $(window).resize(function(){
          Drupal.behaviors.teka_mmda_what_we_do.animate_bar_slick();
        });

        $content.slick($slick_options);
      }
    },
    animate_bar_slick: function () {

        var offset_slick_active = $('.what-we-do__slick-dots .slick-active').offset(),
            width_slick_active = $('.what-we-do__slick-dots .slick-active').width(),
            $slick_bar_active = $('.slick_bar_active');

        if ($slick_bar_active.length > 0) {
          offset_slick_active = (offset_slick_active.left) + 'px';
          $slick_bar_active.css({ 'left': offset_slick_active , width: width_slick_active });
        }
    }
  };
})(jQuery, Drupal);
