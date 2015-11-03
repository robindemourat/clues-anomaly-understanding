'use strict';

(function() {

  var moduloend = function(converter) {
    return [
      { type: 'lang',
        // regex : '\\^\\^modulo-end:(.*)',
        regex : '\\^\\^modulo-aside-clear',
        // replace : '<div class="modulo-end-trigger" id="end-'+'$1'+'">'+'$1'+'</div>'
        replace : '<div class="modulo-aside-clear"></div>'
      }
    ];
  }

  // Client-side export
  if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.moduloend = moduloend; }
  // Server-side export
  if (typeof module !== 'undefined') module.exports = moduloEnd;
})();
