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
      template: '<img ng-src="{{data.url}}"></img><div class="caption-container" ng-if="data.caption"><p ng-bind-html="data.caption" class="caption animate" ng-if="data.caption"></p></div>',
      restrict: 'C',
      link: function postLink(scope, element, attrs) {

        /*scope.$watch('data.url', function(d){
          console.log()
        })*/
      }
    };
  });
