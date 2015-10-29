'use strict';

(function() {
  var classed = function(converter) {
    return [
      { type: 'lang',
        regex : '\\[([^\\]]*)\\]\\(\\^\\^classed:([^\\)]*)\\)',
        replace : '<span class="'+'$2'+'">'+'$1'+'</span>'
      }
    ];
  }

  // Client-side export
  if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.classed = classed; }
  // Server-side export
  if (typeof module !== 'undefined') module.exports = classed;
})();
