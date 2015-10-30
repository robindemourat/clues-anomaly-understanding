'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:moduloFootnote
 * @description
 * # moduloFootnote
 */
angular.module('moduloAnomaliesApp')
  .directive('moduloFootnotePointer', function (markdownConverter, $timeout) {
    return {
      restrict: 'C',
      link: function postLink(scope, element, attrs) {
        var noteId = +element.text();
        var noteContent = noteId +'.\n' + element.attr('id');
        var content = markdownConverter.makeHtml(element.attr('id'));
        var marker = angular.element('<span></span>').addClass('modulo-footnote-marker')
                      .text(noteId + '.');
        var note = angular.element(content)
                          .addClass('modulo-footnote-item')
                          .attr('id', noteId)
                          .prepend(marker);
        /*var note = angular.element(markdownConverter.makeHtml(noteContent))
                      .addClass('modulo-footnote-item')
                      .attr('id', noteId);*/
        note.css('display', 'none');

        angular.element('.middle-col-contents-main').append(note);
        var reposition = function(){
          var top = angular.element(element).position().top,
              height = angular.element(element).innerHeight();
          //checking and updating regarding overlaps
          $timeout(function(){
            angular.forEach(angular.element('.modulo-footnote-item'), function(el, key){
              el = angular.element(el);
              var otherId = +el.attr('id');
              //console.log(otherId, el.height(), el.innerHeight());

              if(noteId > otherId){

                var otherTop = el.position().top,
                    otherHeight = el.innerHeight();
                if(top < otherTop){
                  top = otherTop + otherHeight + 10;
                }
                if(otherTop >0 && top >= otherTop && top <= otherTop + otherHeight){
                  //console.log(otherId, noteId);
                  //console.log(noteId, otherId, top, otherTop, top + (otherHeight));
                  top = otherTop + otherHeight + 10;
                }
              }
              var topPx = top + 'px';
              note
                .css('top', topPx);
              });
              note.css('display', 'block');
          }, 500);


        }

        setTimeout(function(){
          reposition();
        }, 1000);

        var handleClick = function(){
          note.addClass('active');
          angular.element(element).addClass('active');
          setTimeout(function(){
            note.removeClass('active');
            angular.element(element).removeClass('active');

          }, 2000);
        }



        element.on('click', handleClick);
        note.on('click', handleClick);

        angular.element(window).on('resize', reposition);

        scope.$on('$destroy', function(){
          elemen.off(handleClick);
          note.off(handleClick);
          angular.element(window).off('resize', reposition);
        });

        //reposition when printing
        (function() {
            var beforePrint = function() {
              reposition();
            };
            /*var afterPrint = function() {
                console.log('Functionality to run after printing');
            };*/

            if (window.matchMedia) {
                var mediaQueryList = window.matchMedia('print');
                mediaQueryList.addListener(function(mql) {
                    if (mql.matches) {
                        beforePrint();
                    } else {
                        //afterPrint();
                    }
                });
            }

            window.onbeforeprint = beforePrint;
            //window.onafterprint = afterPrint;
        }());

      }
    };
  });
