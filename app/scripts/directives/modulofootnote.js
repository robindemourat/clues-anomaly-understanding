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

        var displaceY = 10;
        // var noteId = +element.text();
        // var noteContent = noteId +'.\n' + element.attr('id');
        //var content = markdownConverter.makeHtml('. '+element.attr('id'));
        var noteId = element.attr('id');
        var noteNumber = noteId.split('-')[noteId.split('-').length - 1];
        element.find('.modulo-footnote-pointer-placeholder').find('a').attr('target', '_blank');//quick and dirty href fix (to improve)
        var content = element.find('.modulo-footnote-pointer-placeholder').html();
        var marker = angular.element('<span></span>').addClass('modulo-footnote-marker')
                      .text(noteNumber);
        var note = angular.element('<aside></aside>')
                          .addClass('modulo-footnote-item')
                          .attr('id', noteId)
                          .append(marker)
                          .append(angular.element('<span class="modulo-footnote-separator"> . </span>'))
                          .append(content);
        /*var note = angular.element(markdownConverter.makeHtml(noteContent))
                      .addClass('modulo-footnote-item')
                      .attr('id', noteId);*/
        note.css('display', 'none');

        var printNote = angular.element('<p></p>')
                                .addClass('modulo-footnote-for-print')
                                .addClass('printonly')
                                .attr('id', noteId)
                                .append('<span>'+noteNumber+'. </span>')
                                .append(content);


        angular.element('.middle-col-contents-main').append(note);
        angular.element('.middle-col-contents-main').append(printNote);
        var reposition = function(){
          var top = angular.element(element).position().top,
              height = angular.element(element).innerHeight();
          //checking and updating regarding overlaps
          $timeout(function(){
            angular.forEach(angular.element('.modulo-footnote-item'), function(el, key){
              el = angular.element(el);

              var otherId = +el.attr('id').split('-')[el.attr('id').split('-').length-1];
              //var otherId = +el.attr('id');
              //console.log(otherId, el.height(), el.innerHeight());

              if(noteNumber > otherId){

                var otherTop = el.position().top,
                    otherHeight = el.innerHeight();
                if(top < otherTop){
                  top = otherTop + otherHeight + displaceY;
                }
                if(otherTop >0 && top >= otherTop && top <= otherTop + otherHeight){
                  //console.log(otherId, noteId);
                  //console.log(noteId, otherId, top, otherTop, top + (otherHeight));
                  top = otherTop + otherHeight + displaceY;
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
