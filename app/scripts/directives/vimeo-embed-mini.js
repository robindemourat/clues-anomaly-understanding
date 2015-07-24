'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:vimeoEmbedMini
 * @description
 * # vimeoEmbedMini
 */
angular.module('moduloAnomaliesApp')
    .directive('vimeoEmbedMini', function (VimeoService) {

    return {
      restrict: 'EA',
      replace: true,
      scope: {
          videoId: '=',
          videoUrl: '@videourl',
          playerOpts: '=',
          playerHeight: '=',
          playerWidth: '=',
          api: '=',
          goto : '='
      },
      link: function (scope, element, attrs, ctrl) {



        var playerId = attrs.playerId || element[0].id,
            iframe, activePlayer;
        element[0].id = playerId;

        var onPause = function(){
          console.log('pause');
        }

        var onPlayStart = function(){
          console.log('play start');
        }

        var onPlayProgress = function(d){
          console.log('play progress', d);
        }

        var onFinish = function(){
          console.log('finish');
        }


        var reload = function(){
          var videoUrl = scope.videoId ? 'https://vimeo.com/' + scope.videoId : scope.videoUrl,
              params = '?url=' + encodeURIComponent(videoUrl) + '&callback=JSON_CALLBACK' + '&player_id=' + playerId,
              options = scope.playerOpts || null;

          if (scope.playerWidth) { params += '&width=' + scope.playerWidth; }
          if (scope.playerHeight) { params += '&height=' + scope.playerHeight; }
          if(attrs.playerId){params += '&player_id='+attrs.playerId}
          params += '&api=1';
          //If params obj is passed, loop through object keys and append query param
          if (options)  {
            for (var prop in options) {
              params += '&' + prop + '=' + options[prop];
            }
          }

          params += '&badge=0&byline=0&portrait=0&title=0';


          VimeoService.oEmbed(params).then(function (data) {
            element.html(data.html);
            /*angular.element(element).children().attr('id', attrs.playerId);

            iframe = (angular.element(element).children()[0]);*/
            var player;
             $(element).find('iframe').load(function(){
                    player = this;
                    $(player).attr('id', attrs.playerId);
                    activePlayer = $f(player);

                    activePlayer.addEvent('ready', function(){
                      console.log('ready');
                      activePlayer.addEvent('pause', onPause);
                      activePlayer.addEvent('finish', onFinish);
                      activePlayer.addEvent('play', onPlayStart);
                      activePlayer.addEvent('playProgress', onPlayProgress);
                      activePlayer.api('setVolume', 1);
                      activePlayer.api('getDuration', function(d){
                        console.log('duration : ', d);
                      });
                    });
             });
            //var player = $f(iframe);
          }, function (data) {
            element.html('<div>' + data + '</div>');
          });
          //player = $f(element[0]);
        }



        reload();


        scope.$watch('goto', function(d){
          console.log('go to ', d);
          if(activePlayer){
            activePlayer.api('seekTo', d);
          }
        })

        scope.$watch('videoUrl', function(d){
          reload();
        });

      }
    };
})

.factory('VimeoService', function ($q, $http) {
  var endpoint = 'https://www.vimeo.com/api/oembed.json';

  return {
    oEmbed: function (params) {
      //console.log(endpoint + params);
      var d = $q.defer();

      $http.jsonp(endpoint + params).success(function(data) {
        d.resolve(data);
      }).error(function(error) {
        console.log(error);
        d.reject('Oops! It looks like there was an error with the vimeo video!');
      });

      return d.promise;
    }
  };
});
