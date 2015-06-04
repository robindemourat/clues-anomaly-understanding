(function(){

  var replaceCarousel = function(a,b,c){
    console.log('ok');
    console.log(this);
  }

  var carousel = function(converter) {
    return [
      { type: 'lang', 
        regex : '\\^\\^carousel:(.*)',
        replace : function(match, images){
          var htmlImages= [], el, finalEl;
          images = images.split(',');
          for(var i in images){
            el = '<li><img src="'+images[i]+'"></li>';
            htmlImages.push(el);
          }
          finalEl = '<ul rn-carousel class="carousel"'
                        +'rn-carousel-buffered rn-carousel-controls rn-carousel-auto-slide rn-carousel-pause-on-hover="true"'
                        +'>\n'
                        + htmlImages.join(' \n')
                        +'</ul>'

          return finalEl;
        }
      }
    ];
  }


  
  // Client-side export
  if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.carousel = carousel; }
  // Server-side export
  if (typeof module !== 'undefined') module.exports = carousel;
}());