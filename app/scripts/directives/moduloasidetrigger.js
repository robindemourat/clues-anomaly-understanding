'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:moduloAsideTrigger
 * @description
 * # moduloAsideTrigger
 */
angular.module('moduloAnomaliesApp')
  .directive('moduloAsideTrigger', function () {
    return {
      restrict: 'C',
      link: function postLink(scope, element, attrs) {
        var parent = element.parent().parent().parent(),
            scrollTop,
            y,
            h;

        var onClick = function(){
          scrollTop = parent.scrollTop();
          y = element.offset().top;
          h = angular.element(window).height();

          parent.animate({scrollTop : scrollTop + y - h/2}, '500', 'swing');
        }

        element.on('click', onClick);

        scope.$on('$destroy', function(){
          element.off('click', onClick);
        })
      }
    };
  });
