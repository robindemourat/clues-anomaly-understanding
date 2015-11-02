'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:moduloasidemanager
 * @description
 * # moduloasidemanager
 */
angular.module('moduloAnomaliesApp')
  .directive('moduloasidemanager', function () {
    return {
      templateUrl: 'views/modulo-aside-manager.html',
      restrict: 'A',
      scope : {
      	newdata : '@asidedata'
      },
      link: function postLink(scope, element, attrs) {

      	scope.first = true;

      	scope.$watch('newdata', function(n, o){
      		try{
      			n = JSON.parse(n);
      		}catch(e){
            return;
      		}

      		try{
      			o = JSON.parse(o);
      		}catch(e){

      		}

    			if(scope.first || n.title != o.title){
    				scope.first = false;
    				scope.data = n;
            scope.$parent.data = n;
            setTimeout(function(){
              scope.$apply();
            });
            console.log('manager data', scope.data);
    			}
      	})

      }
    };
  });
