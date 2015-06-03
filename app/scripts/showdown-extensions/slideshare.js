(function() {
  var slideshare = function(converter) {
    return [
      { type: 'lang', 
        regex : '\\^\\^slideshare:(.*)',
        //replace : '<iframe src="//fr.slideshare.net/slideshow/embed_code/key/rGQLsk1BvwQ2Ik" width="425" height="355" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//fr.slideshare.net/AIMEProject/intervention-de-robin-de-mourat-sminaire-formes-de-la-recherches-25-fvrier-2015-la-paillasse-paris" title="Intervention de Robin de Mourat, Séminaire &quot;Formes de la recherches&quot;, 25 février 2015, La Paillasse, Paris" target="_blank">Intervention de Robin de Mourat, Séminaire &quot;Formes de la recherches&quot;, 25 février 2015, La Paillasse, Paris</a> </strong> from <strong><a href="//www.slideshare.net/AIMEProject" target="_blank">AIMEProject</a></strong> </div>'
        replace : '<iframe src="'+"$1"+'" width="100%" height="200%" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>'
      }
    ];
  }
  
  // Client-side export
  if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.slideshare = slideshare; }
  // Server-side export
  if (typeof module !== 'undefined') module.exports = slideshare;
})();