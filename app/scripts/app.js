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
    /*'ngRoute',*/
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
    /*$routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });*/

    markdownConverterProvider.config({
      extensions: ['glyphicon',
                    'moduloaside',
                    'modulohref',
                    /*'table'*/
                    'grid',
                    'vimeo',
                    'slideshare',
                    'youtube',
                    'carousel',
                    'twittermsgembed',
                    'pdfembed',
                    'tableauembed'
                  ]
    });

  });