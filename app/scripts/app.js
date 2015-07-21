'use strict';

/**
 * @ngdoc overview
 * @name moduloAnomaliesApp
 * @description
 * # moduloAnomaliesApp
 *
 * Main module of the application.
 */
angular
  .module('moduloAnomaliesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'angular-loading-bar',
    'btford.markdown',
    'ui.grid',
    'times.tabletop',
    'duScroll',
    'angular-carousel',
    'pdf'
  ])
  .config(function (markdownConverterProvider) {

    markdownConverterProvider.config({
      extensions: [
                    'glyphicon',
                    'moduloaside',
                    'modulohref',
                    'grid',
                    'vimeo',
                    'slideshare',
                    'youtube',
                    'carousel',
                    'twittermsgembed',
                    'pdfembed',
                    'tableauembed',
                    'iframe',
                    'footnotes'
                  ]
    });

  });
