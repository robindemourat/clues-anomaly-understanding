'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:moduloTimeline
 * @description
 * # moduloTimeline
 */
angular.module('moduloAnomaliesApp')
  .directive('moduloTimeline', function () {
    return {
      restrict: 'AC',
      link: function postLink(scope, element, attrs) {
        element.text('this is the moduloTimeline directive');
      }
    };
  });
