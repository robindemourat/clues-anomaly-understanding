'use strict';

(function() {
  var tableauembed = function(converter) {
    return [
      { type: 'lang',
        regex : '\\^\\^tableau-embed:(.*)',
        replace : function(match, div){
          return div
                  .replace(/width='(\d*)'/, "width='100%'")
                  .replace(/width: (\d*)px/, 'width:100%');
        }
      }
    ];
  }

  // Client-side export
  if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.tableauembed = tableauembed; }
  // Server-side export
  if (typeof module !== 'undefined') module.exports = tableauembed;
})();

