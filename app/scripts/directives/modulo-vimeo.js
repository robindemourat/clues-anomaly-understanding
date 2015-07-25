'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:moduloVimeo
 * @description
 * # moduloVimeo
 */
angular.module('moduloAnomaliesApp')
  .directive('moduloVimeo', function () {
    return {
      templateUrl: 'views/modulo-vimeo.html',
      restrict: 'C',
      link: function postLink(scope, element, attrs) {
        console.log('coucou');
        scope.first = true;
        scope.trustSrc = function(src) {
          return $sce.trustAsResourceUrl(src);
        }

        scope.$watch('newdata', function(n,o){
            n = JSON.parse(n);
            o = JSON.parse(o);
            if(scope.first || n.url != o.url){
              scope.data = n;
              scope.first = false;
            }
        });
      }
    };
  });
