(function(){

  var youtubeTemplate = ['<iframe width="100%" height="500px" src="https://www.youtube.com/embed/','" frameborder="0" allowfullscreen></iframe>'];
  var youtube = function(converter) {
    return [
      { type: 'lang', 
        regex : '\\^\\^youtube:(?:.*)v=(.*)',
        replace : youtubeTemplate[0] + '$1' + youtubeTemplate[1]
        //regex : '\\^\\^vimeo:https?:\/\/(www\.)?vimeo.com\/(\\\d{8,9})',
        //replace : vimeoTemplate[0]+"$2"+vimeoTemplate[1]
      }
    ];
  }
  
  // Client-side export
  if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.youtube = youtube; }
  // Server-side export
  if (typeof module !== 'undefined') module.exports = youtube;
}());