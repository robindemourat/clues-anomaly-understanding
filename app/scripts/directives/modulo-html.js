'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:moduloHtml
 * @description
 * # moduloHtml
 */
angular.module('moduloAnomaliesApp')
  .directive('moduloHtml', function ($http, $sce, $timeout) {
    return {
    template : '<div ng-bind-html="html"></div>',
      restrict: 'AC',
      scope : {
      	data : '@moduloContent'
      },
      link: function postLink(scope, element, attrs) {
        var retries = 0, retriesLimit = 5;
      	scope.first = true;

        var getTwitter = /http:\/\/twitter.com\/(.*)\/statuses\/(.*)/;

        var parseTwitterRefs = function(d){
          var match;

          while(match = getTwitter.exec(d)){
            console.log(match);
            var embedUrl = 'https://api.twitter.com/1/statuses/oembed.json?url=https://twitter.com/'+match[1]+'/status/'+ match[2];
            console.log(embedUrl);
          }
          return d;
        }

      	var update = function(data){
          console.log(data);
          if(data.url){
            $http
            .get(data.url)
            .error(function(d){
              if(retries < retriesLimit){
                retries ++;
                $timeout(function(){
                  update(data);
                }, 500);
              }
            })
            .success(function(d){
              //d = parseTwitterRefs(d);
              scope.html = d;
            });
          }else scope.html = $sce.trustAsHtml(data.html);
      	}


        scope.$watch('data', function(n,o){
            //todo : wrap in try/catch
        		n = JSON.parse(n);
        		o = JSON.parse(o);
            if(n.html && n.html != o.html){
              scope.html = $sce.trustAsHtml(n.html);
            }else if(scope.first || n.url != o.url){
        			update(n);
        			scope.first = false;
        		}
      	});
      }
    };
  });
