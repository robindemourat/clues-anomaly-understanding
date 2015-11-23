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
    'hc.downloader',
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
                    /*'grid',*/
                    'table',
                    'vimeo',
                    'slideshare',
                    'youtube',
                    'carousel',
                    'twittermsgembed',
                    'pdfembed',
                    'tableauembed',
                    'iframe',
                    'classed',
                    'moduloend',
                    'footnotes',
                    'toc'
                  ]
    });

  });
