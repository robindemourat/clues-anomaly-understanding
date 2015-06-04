'use strict';

/**
 * @ngdoc function
 * @name moduloAnomaliesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the moduloAnomaliesApp
 */
angular.module('moduloAnomaliesApp')
  .controller('MainCtrl', function ($scope, $rootScope, $window, $sce, $http, markdownProcessor, $timeout) {

  	var initVariables = function(){
  		$scope.showCols = {
	    	left : true,
	    	middle : true,
	    	right : true
	    };
  	}

  	var initWatchers = function(){
      //gspreadsheet update deactivated for now, because updating everything breaks scroll-related interactions
      //todo : diff update only on changed elements
      $rootScope.$on('markdownUpdate', function(e, data){
        $scope.contents.html = data.html;
        $scope.$apply();
      });

      $rootScope.$on('zoteroBibliography', function(e,data){
        $scope.contents.bibliography = data;
      });

  	}

  	var initFunctions = function(){
  		reloadMarkdown('data/test.md');
  	}

  	var reloadMarkdown= function(url){
  		$http.get(url)
  		.success(function(d){
  			markdownProcessor.process(d, function(data){
          $scope.contents = data;
          $rootScope.documentTitle = data.title;
          $timeout(function(){
            var container = angular.element(document.getElementById('middle-col-container'));
            var wrapper = angular.element(document.getElementById('middle-col-wrapper'));

            container.on('scroll', function() {
              var height = wrapper.height(),
                  scrollTop = container.scrollTop(),
                  screenYCenter=scrollTop + height/2;
              updateAside(screenYCenter);
            });
          });
          
        }, true);
  		}).error(function(d){

  		});
  	};

    var updateAside = function(screenYCenter){
      if($scope.contents.library){
        var min = Infinity, wining;
        for(var i in $scope.contents.library){
          var vis = $scope.contents.library[i];
          //get element
          var el = $('[title="'+vis.title+'"]');//angular.element(document.querySelector('title', vis.title));
          //get scroll top
          if(el.offset()){
            vis.top = el.offset().top;
            //defining closest to screen's center
            var dist = Math.abs(vis.top - screenYCenter);
            if(dist < min){
              min = dist;
              wining = i;
            }
          }
        }
        if(wining && $scope.contents.library[wining]){
          $scope.asideData = $scope.contents.library[wining];
          if(!$scope.$$phase)
            $scope.$apply();
        }
          

        
        
      }
    }


    $scope.setColClass = function(col){
    	var cols = $scope.showCols;
    	if(!cols[col] && col !== 'right'){
    		return 'col-0';
    	}else if(!cols[col] && col === 'right'){
    		return 'col-xs-offset-12 col-0';
    	}else switch(col){

    		case 'left':
    			if(cols[col])
    				return 'col-xs-2';
    		break;

    		case 'middle':
    			if(cols.left && cols.right){
    				return 'col-xs-6 col-xs-offset-2';
    			}else if(!cols.left && cols.right){
    				return 'col-xs-6';
    			}else if(cols.left && !cols.right){
    				return 'col-xs-10 col-xs-offset-2';
    			}else{
    				return 'col-xs-12'
    			}
    		break;

    		case 'right':
    			if(cols.left && cols.middle){
    				return 'col-xs-4 col-xs-offset-8';
    			}else if(!cols.left && cols.middle){
    				return 'col-xs-6 col-xs-offset-6'
    			}else if(cols.left && !cols.middle){
    				return 'col-xs-10 col-xs-offset-2'
    			}else{
    				return 'col-xs-12';
    			}
    		break;

    		default:
    			return 'col-0';
    		break;
    	}
    };


    initVariables();
    initFunctions();
    initWatchers();
  });