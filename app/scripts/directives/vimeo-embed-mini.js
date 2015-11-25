'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:vimeoEmbedMini
 * @description
 * # vimeoEmbedMini
 */
angular.module('moduloAnomaliesApp')
    .directive('vimeoEmbedMini', function (VimeoService, $rootScope, $window) {

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
          printMode : '=printmode',
          goto : '='
      },
      link: function (scope, element, attrs, ctrl) {



        var playerId = attrs.playerId || element[0].id,
            iframe, activePlayer,
            width,
            ratio;
        element[0].id = playerId;

        var onPause = function(){
          // console.log('pause');
        }

        var onPlayStart = function(){
          // console.log('play start');
        }

        var onPlayProgress = function(d){
          $rootScope.$emit('playprogress', d);
        }

        var onFinish = function(){
          // console.log('finish');
        }


        var reload = function(){
          if(!scope.videoId && !scope.videoUrl){
            setTimeout(function(){
              reload();
            }, 100)
            return;
          }
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

          params += '&badge=0&byline=0&portrait=0&title=0' + '&_=' + (new Date().getTime());


          VimeoService.oEmbed(params).then(function (data) {
            ratio = data.width / data.height;

            console.log(data.width, data.height, ratio);


            element.html(data.html);
            /*angular.element(element).children().attr('id', attrs.playerId);

            iframe = (angular.element(element).children()[0]);*/
            var player;
             $(element).find('iframe').load(function(){
                    player = this;
                    $(player).attr('id', attrs.playerId);
                    activePlayer = $f(player);

                    activePlayer.addEvent('ready', function(){
                      // console.log('ready');
                      activePlayer.addEvent('pause', onPause);
                      activePlayer.addEvent('finish', onFinish);
                      activePlayer.addEvent('play', onPlayStart);
                      activePlayer.addEvent('playProgress', onPlayProgress);
                      activePlayer.api('setVolume', 1);
                      activePlayer.api('getDuration', function(d){
                        // console.log('duration : ', d);
                      });
                      onResize();
                    });
             });
            //var player = $f(iframe);
          }, function (data) {
            element.html('<div>' + data + '</div>');
          });
          //player = $f(element[0]);
        }


        var onResize = function(){
          element.height(element.width()/ratio);
        }



        reload();


        scope.$watch('goto', function(d){
          if(activePlayer){
            activePlayer.api('seekTo', d);
          }
        })

        scope.$watch('videoUrl', function(d){
          if(d && typeof d === 'string'){
            reload();
          }
        });

        angular.element($window).on('resize', onResize);

        scope.$watch('$destroy', function(){
          angular.element($window).off('resize', onResize);
        })

      }
    };
})

.factory('VimeoService', function ($q, $http, $window, $timeout) {
  var endpoint = 'https://www.vimeo.com/api/oembed.json';



  return {
    oEmbed: function (params) {
      var d = $q.defer();

      $http.jsonp(endpoint + params).success(function(data) {
        d.resolve(data);
      }).error(function(error) {
        d.reject('Oops! It looks like there was an error with the vimeo video!');
      });

      return d.promise;
    }
  };
});
