'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:moduloDicto
 * @description
 * # moduloDicto
 */
angular.module('moduloAnomaliesApp')
  .directive('moduloDicto', function (dictoModuloViewParser, $http, $compile) {
    return {
      templateUrl: 'views/modulo-dicto.html',
      restrict: 'C',
      link: function postLink($scope, element, attrs) {


        $scope.goto = 0;

        $scope.goTo = function(sec){
          $scope.goto = sec;
        }

        $scope.$watch('newdata', function(nouv, old){
          try{
            var nouvJ = JSON.parse(nouv);
            var oldJ;

            if(old){
              oldJ = JSON.parse(old);
            }
            if(nouvJ.title != oldJ.title || !$scope.visData){
              $scope.temp = JSON.parse(nouv);
            }else{
              $scope.temp = undefined;
            }

          }catch(e){
            console.error('invalid json data for timeline :',nouv);
            $scope.msg = 'Failed to load due to badly formatted json !'
          };

          if($scope.temp){
            $http
              .get($scope.temp.data)
              .success(function(d){
                $scope.data = dictoModuloViewParser.parseSrtTranscription(d);
              })
              .error(function(err){

              });
          }
        });
      }
    };
  });
