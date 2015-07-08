(function(){

  var iframe = function(converter) {
    return [
      { type: 'lang',
        regex : '\\^\\^iframe:(.*)',
        replace : "<iframe class='free-embed-iframe' src='" + '$1' + "'></iframe>"
      }
    ];
  }

  // Client-side export
  if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.iframe = iframe; }
  // Server-side export
  if (typeof module !== 'undefined') module.exports = iframe;
}());
