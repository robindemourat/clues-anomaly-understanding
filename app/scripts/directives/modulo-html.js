'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:moduloHtml
 * @description
 * # moduloHtml
 */
angular.module('moduloAnomaliesApp')
  .directive('moduloHtml', function ($http, $sce, $timeout) {
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
          if(data.url){
            $http
            .get(data.url)
            .error(function(d){
              $timeout(function(){
                update(data);
              }, 500);
            })
            .success(function(d){
              scope.html = d;
            });
          }
      	}
        

        scope.$watch('data', function(n,o){
        		n = JSON.parse(n);
        		o = JSON.parse(o);
            if(n.html && n.html != o.html){
              scope.html = $sce.trustAsHtml(n.html);
            }else if(scope.first || n.url != o.url){
        			update(n);
        			scope.first = false;
        		}
      	});
      }
    };
  });
