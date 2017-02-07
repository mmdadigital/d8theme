(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.mmda_header = {
    attach: function (context, settings) {

      // Define the target position to display the header again.
      var $headerTargetDistance = 300;
      var $headerTarget = $(window).scrollTop() - $headerTargetDistance;

      // Init scrollmagic.
      var $headerController = new ScrollMagic.Controller();

      // Build a scene.
      var $headerScene = new ScrollMagic.Scene({
        triggerElement: '.sticky-header-trigger',
        triggerHook: 'onLeave'
      })
      .setClassToggle('.l-header', 'is-hidden')
      .on('update', function (e) {

        // When scrolling up.
        if (e.target.controller().info('scrollDirection') === 'REVERSE') {
          // Display the header again if the top target is reached.
          if (e.scrollPos <= $headerTarget || e.scrollPos === 0) {
            $('.l-header').removeClass('is-hidden');
          }
        }
        // When scrolling down.
        else {
          // Hide the header.
          if (e.scrollPos >= $('.sticky-header-trigger').offset().top) {
            $('.l-header').addClass('is-hidden');
          }

          // Define where the header should be visible again.
          $headerTarget = e.scrollPos - $headerTargetDistance;
        }
      })
      // .addIndicators()
      .addTo($headerController);

      // Smaller header.
      // Build a scene.
      var $headerSceneNarrow = new ScrollMagic.Scene({
        triggerElement: 'body',
        triggerHook: 'onLeave',
        offset: 1
      })
      .setClassToggle('.l-header', 'l-header--narrow')
      // .addIndicators()
      .addTo($headerController);

      // If home.
      if ($('.path-body').hasClass('path-frontpage')) {
        // Build a scene.
        var $headerSceneHome = new ScrollMagic.Scene({
          triggerElement: '.sticky-header-trigger-2',
          triggerHook: 'onLeave'
        })
        .setClassToggle('.l-header', 'l-header--light')
        // .addIndicators()
        .addTo($headerController);
      }

      // If Case.
      if ($('.path-body').hasClass('page-node-type-cases')) {
        // Build a scene.
        var $headerSceneCase = new ScrollMagic.Scene({
          triggerElement: '.case-services',
          triggerHook: 'onLeave'
        })
        .setClassToggle('.l-header', 'l-header--light')
        // .addIndicators()
        .addTo($headerController);
      }

    }
  };

})(jQuery, Drupal);
