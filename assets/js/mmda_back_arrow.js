(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.mmda_back_arrow = {
    attach: function (context, settings) {
      var $arrow = $('.go-back-arrow');

      $arrow.click(function(event){
        event.preventDefault();
        if(smoothsState > 0) {
          window.history.back();
        }
        else {
          // If last page was not in the website, redirects to home.
          window.location = settings.path.baseUrl;
        }
        return false;
      })

    }
  };

})(jQuery, Drupal);
