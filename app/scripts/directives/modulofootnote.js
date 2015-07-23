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
        var note = angular.element(markdownConverter.makeHtml(noteContent))
                      .addClass('modulo-footnote-item')
                      .attr('id', noteId);
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

        element.bind('click', handleClick);
        note.bind('click', handleClick);

      }
    };
  });
