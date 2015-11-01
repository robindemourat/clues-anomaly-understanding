'use strict';

/*(function() {
  var footnotes = function(converter) {
    return [
      { type: 'lang',
        regex : '\\[#\\]\\[(.*)\\]',
        replace : '<span class="modulo-footnote" id="'+'$1'+'">'+1+'</span>'
      }
    ];
  }

  // Client-side export
  if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.footnotes = footnotes; }
  // Server-side export
  if (typeof module !== 'undefined') module.exports = footnotes;
})();*/

(function () {

  // var footnotesPattern = /\[#\]\[([^\]]*)\]/gi, match;
  // var footnotesPattern = /\[#\]\[([^\]]*(?:(?!\\)\])*.*)\]/gi, match;
  //var footnotesPattern = /\[#\]\[([^\]]*)\]/gi, match;
  var footnotesPattern = /\[#\]\[(([^\]\[]*)|(.*\[.*))\]/gi, match;

  var footnotes = function (converter) {

    var filter = function (text) {

      var i = 0;

      while(match = footnotesPattern.exec(text)){
        i++;
        var ref = match[1];
        //var rep = '<span class="modulo-footnote-pointer" id="'+ref+'">'+i+'</span>';
        var rep = '<span class="modulo-footnote-pointer" id="modulo-footnote-pointer-'+i+'"><sup class="modulo-footnote-pointer-number">'+i+'</sup><span class="modulo-footnote-pointer-placeholder">'+ref+'</span></span>';
        //text = text.replace(match[0], rep);
        text = text.substr(0, match.index) + rep + text.substr(match.index + match[0].length, text.length);
      }

      return text;
    };
    return [
      {
        type:   'lang',
        filter: filter
      }
    ];
  };

  // Client-side export
  if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) {
    window.Showdown.extensions.footnotes = footnotes;
  }
  // Server-side export
  if (typeof module !== 'undefined') {
    module.exports = footnotes;
  }
}());
