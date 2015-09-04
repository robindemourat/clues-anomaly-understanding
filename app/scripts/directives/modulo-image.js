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
      template: '<img ng-src="{{data.url}}"></img><div class="comment-container" ng-if="data.comment"><p ng-bind="data.comment" class="comment animate" ng-if="data.comment"></p></div>',
      restrict: 'C',
      link: function postLink(scope, element, attrs) {

        /*scope.$watch('data.url', function(d){
          console.log()
        })*/
      }
    };
  });
