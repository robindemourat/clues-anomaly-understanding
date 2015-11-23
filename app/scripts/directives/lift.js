'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:lift
 * @description
 * # lift
 */
angular.module('moduloAnomaliesApp')
  .directive('lift', function () {
    return {
      restrict: 'E',
      scope : {
        scrollTarget : '@',
        updateOn  : '@'
      },
      link: function postLink(scope, element, attrs) {
        var scrollTarget = angular.element(scope.scrollTarget),
            parent = element.parent(),
            targetters,
            targets,
            scrollTop,
            minDist,
            previous, previousI,
            next,
            displaceRatio,
            top;


        var onScroll = function(){
          scrollTop = scrollTarget.scrollTop();
          if(!targetters){
            targetters = parent.find('div[scrollspy]');
          }
          try{
            targets = targetters.map(function(i, t){
              var id = angular.element(t).attr('scrollspy');
              var top = scrollTarget.find(id).position().top;
              return {
                id : id,
                top : top
              }
            });
          }catch(e){
            return;
          }




          minDist = Infinity, previous = undefined;
          targets.each(function(i, target){
            if(target.top < scrollTop && (scrollTop - target.top) < minDist){
              minDist = scrollTop - target.top;
              previous = target;
              previousI = i;
            }
          });

          if(!angular.isDefined(previous)){
            previous= targets[0];
            previousI = 0;
          }
          if(previousI === targets.length){
            next = targets[previousI];
          }else{
            next = targets[previousI + 1];
          }

          displaceRatio = (scrollTop - previous.top)/(next.top - previous.top);

          var previousBullet=  parent.find('div[scrollspy='+previous.id+'] .toc-element-bullet');
          var nextBullet=  parent.find('div[scrollspy='+next.id+'] .toc-element-bullet');
          var pY = previousBullet.offset().top;
          var nY = nextBullet.offset().top;
          var dY= (nY - pY) * displaceRatio;

          top = pY + dY;



          element.css({top : top})

        }


        scrollTarget.on('scroll', onScroll);
        scope.$watch("updateOn", function(){
          setTimeout(onScroll, 600);
        });


        scope.$on('$destroy', function(){
          scrollTarget.off('scroll', onScroll);
        })
      }
    };
  });
