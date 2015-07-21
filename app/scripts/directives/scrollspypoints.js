'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:scrollspyPoints
 * @description
 * # scrollspyPoints
 */
angular.module('moduloAnomaliesApp')
  .directive('scrollspyPoints', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        var containerClass= attrs.duScrollContainer,
            targetContainer = angular.element('.'+containerClass),
            targets = [];

        scope.$watch(function(){
          return angular.element(element)[0].children;
        }, function(elements){
          $timeout(function(){
            var els = angular.element(elements).find('div[scrollspy]');
            angular.forEach(els, function(el){
             // if(angular.element(el).attr('du-scrollspy')){
                console.log(angular.element(el).attr('du-scrollspy'));
                targets.push(angular.element(el).attr('du-scrollspy'));
              //}
            });
          });
          //console.log(els);
        });


        targetContainer.bind('scroll', function(){
          var y = (angular.element(this).scrollTop()),
              smallestDist = Infinity;
          //console.log(targets);
          /*console.log(els.length);
          for(var i in els){
            var el = els[i];
            console.log(angular.element(el).attr('scrollspy'));
          }*/
        })
      }
    };
  });
