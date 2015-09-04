'use strict';

(function() {

  var moduloAside = function(converter) {
    return [
      { type: 'lang',
        regex : '\\^\\^modulo-aside:(.*)',
        replace : '<div class="modulo-aside-trigger animate" ng-class="{\'inactive\' : asideData.title != \''+'$1'+'\'}" id="'+'$1'+'">'+'$1'+'</div>'
      }
    ];
  }

  // Client-side export
  if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.moduloaside = moduloAside; }
  // Server-side export
  if (typeof module !== 'undefined') module.exports = moduloaside;
})();
