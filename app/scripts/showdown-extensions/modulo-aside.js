'use strict';

(function() {

  var moduloAside = function(converter) {
    return [
      { type: 'lang',
        regex : '\\^\\^modulo-aside:(.*)',
        replace : '<div class="modulo-aside-trigger animate" ng-class="{\'inactive\' : asideData.title != \''+'$1'+'\'}" id="'+'$1'+'">'+'$1'+'</div>\n\n<figure class="modulo-aside-figure printonly" visible="printMode" feed-fn="feedFigure(id, callback)" id="'+'$1'+'"></figure>\n\n\n'
      }
    ];
  }

  // Client-side export
  if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.moduloaside = moduloAside; }
  // Server-side export
  if (typeof module !== 'undefined') module.exports = moduloaside;
})();
