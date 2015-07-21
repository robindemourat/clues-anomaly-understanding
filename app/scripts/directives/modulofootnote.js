'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:moduloFootnote
 * @description
 * # moduloFootnote
 */
angular.module('moduloAnomaliesApp')
  .directive('moduloFootnotePointer', function (markdownConverter) {
    return {
      restrict: 'C',
      link: function postLink(scope, element, attrs) {
        var noteId = element.text();
        var noteContent = noteId +'.' + element.attr('id');
        var note = angular.element(markdownConverter.makeHtml(noteContent))
                      .addClass('modulo-footnote-item')
                      .attr('id', noteId);

        angular.element('.middle-col-contents-main').append(note);
        var reposition = function(){
          var top = angular.element(element).position().top,
              height = angular.element(element).height();
          //checking and updating with overlaps
          angular.forEach(angular.element('.modulo-footnote-item'), function(el, key){
            el = angular.element(el);
            if(el.attr('id') != noteId){
              var otherTop = el.position().top,
                  otherHeight = el.height();
              if(top >= otherTop && top <= otherTop + otherHeight){
                top += otherHeight;
              }
            }
          });

          var topPx = top + 'px';
          note
            .css('top', topPx);
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
