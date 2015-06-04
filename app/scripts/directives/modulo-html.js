'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:moduloHtml
 * @description
 * # moduloHtml
 */
angular.module('moduloAnomaliesApp')
  .directive('moduloHtml', function ($http) {
    return {
    template : '<div ng-bind-html="html"></div>',
      restrict: 'AC',
      scope : {
      	data : '@moduloContent'
      },
      link: function postLink(scope, element, attrs) {
      	var tata;

      	scope.first = true;

      	var update = function(data){
      		console.log('update');
  			$http
				.get(data.url)
				.error(function(d){
					scope.html = ('Could not load html '+data.url+' here.')
				})
				.success(function(d){
					scope.html = d;
				});

      	}
        

        scope.$watch('data', function(n,o){
        		n = JSON.parse(n);
        		o = JSON.parse(o);
        		if(scope.first || n.url != o.url){
        			update(n);
        			scope.first = false;
        		}
      	});
      }
    };
  });
