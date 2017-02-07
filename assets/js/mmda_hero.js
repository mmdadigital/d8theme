(function($) {
  'use strict';
  Drupal.behaviors.teka_mmda_hero = {
    attach: function (context, settings) {
      var len = $(".node--type-banner", context).length;
      if (len > 0) {
        $(".node--type-banner").each(function(){
          $(this).css( "display", "none");
        });
        var random = Math.floor( Math.random() * len );
        var banner = $(".node--type-banner").eq(random);
        var bg_url = banner.attr('data-bg');
        banner.css( "background-image", "url("+ bg_url +")");
        banner.css( "display", "block");
      }
    }
  };
})(jQuery);
