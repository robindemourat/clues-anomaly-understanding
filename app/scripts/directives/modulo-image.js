'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:moduloImage
 * @description
 * # moduloImage
 */
angular.module('moduloAnomaliesApp')
  .directive('moduloImage', function () {
    return {
      template: '<img ng-src="{{data.url}}"></img>',
      restrict: 'C',
      link: function postLink(scope, element, attrs) {
        //element.text('this is the moduloImage directive');
      }
    };
  });
