(function() {
  var modulo = function(converter) {
    return [
      { type: 'lang', 
        regex : '\\^\\^modulo-aside:(.*)',
        replace : '<div class="modulo-trigger" id="'+'$2'+'">modulo trigger</div>'
      }
    ];
  }
  
  // Client-side export
  if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.modulo = modulo; }
  // Server-side export
  if (typeof module !== 'undefined') module.exports = modulo;
})();