(function(){

  var pdfembed = function(converter) {
    return [
      { type: 'lang', 
        regex : '\\^\\^pdf-embed:(.*)',
        replace : function(match, url){
          return '<pdf-viewer '
              //+'delegate-handle="my-pdf-container"'
              +'class="pdf-viewer-embed" '
              +'url="\''+url+'\'" '
              +'scale="1" '
              +'show-toolbar="true" '
              +'>'
            +'</pdf-viewer>';
        }
      }
    ];
  }
  
  // Client-side export
  if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.pdfembed = pdfembed; }
  // Server-side export
  if (typeof module !== 'undefined') module.exports = pdfembed;
}());