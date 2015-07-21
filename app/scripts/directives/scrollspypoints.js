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
            targets = [],
            els;

        scope.$watch(function(){
          return angular.element(element)[0].children;
        }, function(elements){
          $timeout(function(){
            els = angular.element(element).find('div[scrollspy]');
            angular.forEach(els, function(el){
                targets.push(angular.element(el).attr('du-scrollspy'));
              //}
            });
          });
          //console.log(els);
        });


        targetContainer.bind('scroll', function(){
          $timeout(function(){
            var y = (targetContainer.scrollTop()),
                smallestDist = Infinity,
                target;
            for(var i in targets){
              var otherY = targetContainer.find(targets[i]).position().top;
              //console.log(otherY, y);
              if(otherY <= y){
                smallestDist = otherY - y;
                target = targets[i];
              }
            }
            els.removeClass('active');
            var selector = 'div[scrollspy="'+target+'"]';
            angular.element(selector).addClass('active');
          })


        })
      }
    };
  });
