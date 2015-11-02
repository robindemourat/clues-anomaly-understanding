'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:moduloAsideFigure
 * @description
 * # moduloAsideFigure
 */
angular.module('moduloAnomaliesApp')
  .directive('moduloAsideFigure', function () {
    return {
      restrict: 'C',
      templateUrl : 'views/modulo-figure.html',
      scope : {
        visible : '=',
        feedFn : '&'
      },
      link: function postLink(scope, element, attrs) {
        var id = element.attr('id');

        var onNewData = function(data){
          if(data){
            scope.localData = data;
            console.log('data update', scope.localData);
          }
        }

       /* scope.feedFn({
              id : id,
              callback : onNewData
        });*/

        scope.$watch('visible', function(visible){
          if(visible){
            scope.feedFn({
              id : id,
              callback : onNewData
            });
          }else{
            scope.localData = undefined;
          }
        });
      }
    };
  });
