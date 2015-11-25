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
              var otherY = (targetContainer.find(targets[i]).position())?targetContainer.find(targets[i]).position().top:0;
              //console.log(therY, y);
              if(otherY <= y + window.innerHeight/2){
                smallestDist = otherY - y;
                target = targets[i];
              }
            }
            els.removeClass('active');
            var selector = 'div[scrollspy="'+target+'"]';
            angular.element(selector).addClass('active');
          });
        });
      }
    };
  })
  //I scroll to top of document when I'm clicked
  .directive('scrollToTop', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        var scrollToTop = function(){
          var targetClass = attrs.duScrollContainer;
          angular.element('.'+targetClass).animate({scrollTop : 0})
        }

        angular.element(element).bind('click', scrollToTop);
      }
    };
  })
  //I modify a model when I'm scrolled at top
  .directive('topScrollTrigger', function () {
    return {
      restrict: 'A',
      scope :{
        topScrollTrigger : '&'
      },
      link: function postLink(scope, element, attrs) {
        var top = false, s;
        var target = angular.element('.toc-inline .toc-element:last-child');
        var threshold;

        angular.element(element).on('scroll', function(e, d){
          s = angular.element(element).scrollTop();


          if(target.length === 0){
            target = angular.element('.toc-inline  .toc-element:last-child');
            // console.log(target.text());
          }

          if(target){
            // threshold = target.position().top;
             threshold = target.offset().top;
          }else{
            threshold = 0;
          }

          if(threshold > 0){
            top = true;
            scope.topScrollTrigger({
              top : true
            });
          }else{
            top = false;
            scope.topScrollTrigger({
              top : false
            })
          }


          /*if(s <= threshold){
            top = true;
            scope.topScrollTrigger({
              top : true
            })
          }else if(s > threshold && top){
            top = false;
            scope.topScrollTrigger({
              top : false
            })
          }*/
        });
      }
    };
  })
   //I center bullets
  .directive('tocElement', function ($window) {
    return {
        restrict: 'C',
        scope : {
          updateOn : '@'
        },
        link: function postLink(scope, element, attrs) {

              var content,
                  contentHeight,
                  bullet;


              var onResize = function(){
                contentHeight = element.height();
                bullet = element.find('.toc-element-bullet');
                console.log(contentHeight);
                bullet.css({top : '-' + (contentHeight/2  - 5) + 'px'})
              }

              onResize();

              angular.element($window).on('resize', onResize);

              scope.$watch('updateOn', onResize);

              scope.$watch('$destroy', function(){
                angular.element($window).off('resize', onResize);

              })


            }
    };
  })
