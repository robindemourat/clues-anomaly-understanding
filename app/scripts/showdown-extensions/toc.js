'use strict';

(function() {

  var tocContents = '<div '
        +   'ng-repeat="el in contents.toc" '
        +   'ng-style="{\'padding-left\':((el.level-1) * 5 - 5)+\'px\'}" '
        +   'class="toc-element animate" '
        + '>'
        +   '<a ng-href="#{{el.tag}}" du-smooth-scroll>'
        +     '<span class="toc-element-bullet"'
        +     '></span>'
        +     '<span'
        +     '  class="toc-element-title animate" '
        +     '  ng-click="toggleIndex(false)" '
        +     '  ng-bind="el.title" '
        +     '></span>'
        +   '</a>'
        +'</div>'
  var toc = function(converter) {
    return [
      { type: 'lang',
        regex : '\\[TOC\\]',
        replace : '<nav class="toc toc-inline"><h2 class="toc-title">Table of contents</h2>'+tocContents+'</nav>'
      }
    ];
  }

  // Client-side export
  if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.toc = toc; }
  // Server-side export
  if (typeof module !== 'undefined') module.exports = toc;
})();
