'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:moduloDicto
 * @description
 * # moduloDicto
 */
angular.module('moduloAnomaliesApp')
  .directive('moduloDicto', function (dictoModuloViewParser, $rootScope,$http, $compile) {
    return {
      templateUrl: 'views/modulo-dicto.html',
      restrict: 'C',
      link: function postLink($scope, element, attrs) {


        $scope.goto = 0;
        $scope.currentTime = 0;

        $scope.goTo = function(sec){
          $scope.goto = sec;
        }

        $rootScope.$on('playprogress', function(e,d){
          $scope.currentTime = d.seconds;
          setTimeout(function(){
            $scope.$apply();
          });

          //cut mode
          if(!$scope.temp.cut|| $scope.temp.cut !== 'no'){
            var active;
            //check if one transcription is active
            $scope.data.data.forEach(function(paragraph){
              if($scope.currentTime >= paragraph.begin && $scope.currentTime <= paragraph.end){
                active = true;
              }
            });
            //if no transcriptions are active, jump to the next/first transcription in video
            if(!active){
              var closestIndex, closestBegin = Infinity;
              $scope.data.data.forEach(function(paragraph, i){
                if(paragraph.begin - $scope.currentTime > 0 && paragraph.begin - $scope.currentTime < closestBegin){
                  closestIndex = i;
                  closestBegin = paragraph.begin - $scope.currentTime;
                }
              });
              //if end of video, jump to the first
              if(!closestIndex){
                closestIndex = 0;
              };
              $scope.goto = $scope.data.data[closestIndex].begin;
            }
          }
        });

        $scope.isActive = function(paragraph){

          if($scope.currentTime >= paragraph.begin && $scope.currentTime <= paragraph.end){
            return true;
          }else return false;
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
