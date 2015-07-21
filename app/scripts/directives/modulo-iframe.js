'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:moduloIframe
 * @description
 * # moduloIframe
 */
angular.module('moduloAnomaliesApp')
  .directive('moduloIframe', function ($sce) {
    return {
      template: '<div ng-if="!data">Loading website ....</div><iframe ng-src="{{trustSrc(data.url)}}"></iframe>',
      restrict: 'AC',
      scope : {
      	newdata : '@moduloContent'
      },
      link: function postLink(scope, element, attrs) {

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
