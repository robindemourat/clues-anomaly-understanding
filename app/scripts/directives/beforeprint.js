'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:beforePrint
 * @description
 * # beforePrint
 */
angular.module('moduloAnomaliesApp')
  .directive('beforePrint', function () {
    return {
      restrict: 'A',
      scope : {
        beforePrint : '&',
        afterPrint : '&'
      },
      link: function postLink(scope, element, attrs) {

        (function() {
            var beforePrint = function() {
              scope.beforePrint();
            };
            var afterPrint = function() {
                scope.afterPrint();
            };

            if (window.matchMedia) {
                var mediaQueryList = window.matchMedia('print');
                mediaQueryList.addListener(function(mql) {
                    if (mql.matches) {
                        beforePrint();
                    } else {
                        afterPrint();
                    }
                });
            }

            window.onbeforeprint = beforePrint;
            window.onafterprint = afterPrint;
        }());
      }
    };
  });
