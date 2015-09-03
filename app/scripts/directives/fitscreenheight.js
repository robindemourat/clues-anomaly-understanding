'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:fitscreenheight
 * @description
 * # fitscreenheight
 */
angular.module('moduloAnomaliesApp')
  .directive('fitScreenHeight', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var el = angular.element(element),
            height,
            pos;

        var update = function(){
          height = angular.element(window).height();
          pos = el.offset().top;
          el.css('height', height - pos);
        }

        update();

        angular.element(window).on('resize', update);

        scope.$on('$destroy', function(){
          angular.element(window).off('resize', update);
        });

      }
    };
  });
