'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:fitprevious
 * @description
 * # fitprevious
 */
angular.module('moduloAnomaliesApp')
  .directive('fitprevious', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {


        scope.$watch(function(){
          return $(element).prev().height();
        }, function(height){
          angular.element(element)
          .css({
            paddingTop : height + 'px'
          })
        })

      }
    };
  });
