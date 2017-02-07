/**
 * @file
 * A JavaScript file for the theme.
 *
 * This JavaScript file is loaded on all Pages.
 */
var smoothsState = 0;
(function($, Drupal) {
  'use strict';
  Drupal.behaviors.teka_mmda_smoothState = {
    attach: function (context, settings) {
      var $page = $('#l-scene', context),
      options = {
        debug: true,
        cacheLength: 20,
        prefetchBlacklist: '.no-prefetch',
        onStart: {
          duration: 200, // Duration of our animation
          render: function ($container) {
            // Add your CSS animation reversing class
            $container.addClass('is-exiting');
            // Restart your animation
            smoothState.restartCSSAnimations();
          }
        },
        blacklist: '.no-smoothState, .contextual-links a, .toolbar-tab a',
        onReady: {
          duration: 0,
          render: function ($container, $newContent) {
            // Remove your CSS animation reversing class
            $container.removeClass('is-exiting');
            // Inject the new content
            $container.html($newContent);
          }
        },
        onAfter: function($container, $newContent) {
          smoothsState++;
          setTimeout(function(){
            Drupal.attachBehaviors($container);
          }, 600);
        }
      },
      smoothState = $page.smoothState(options).data('smoothState');
      Drupal.behaviors.teka_mmda_smoothState.blacklist();
    },
    blacklist: function (){
      var $toolbar = $('.toolbar');
      var $contextual_links = $('.contextual-links');
      setTimeout(function(){
        if($toolbar.length > 0 ) $toolbar.find('a').addClass('no-smoothState');
        if($contextual_links) $contextual_links.find('a').addClass('no-smoothState');
      }, 600);
    }
  };

})(jQuery, Drupal);
