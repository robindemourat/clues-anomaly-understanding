'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:twitterMsgOEmbed
 * @description
 * # twitterMsgOEmbed
 */
angular.module('moduloAnomaliesApp')
  .directive('twittermsgoembed', function ($http) {
    return {
      /*template: '<div></div>',*/
      restrict: 'A',
      scope : {
      	src : '@src'
      },
      link: function postLink(scope, element, attrs) {
        //todo : find a way to fetch that without credentials
        element.text('twitter element here');
        /*$http
        	.get('https://api.twitter.com/1/statuses/oembed.json?url='+scope.src)
        	.success(function(j){
        		element.text(j);
        	})
        	.error(function(){
        		element.text('Could not load a tweet here');
        	})*/
      }
    };
  });
