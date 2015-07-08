(function(){

  var twittermsgembed = function(converter) {
    return [
      { type: 'lang',
        regex : '\\^\\^twitter-msg-oembed:(.*)',
        replace : '<div twittermsgoembed src="'+'$1'+'">... Loading a twitter message ...</div>'
      }
    ];
  }

  // Client-side export
  if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.twittermsgembed = twittermsgembed; }
  // Server-side export
  if (typeof module !== 'undefined') module.exports = twittermsgembed;
}());
