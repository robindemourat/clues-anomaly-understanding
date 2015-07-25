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
      $scope.popupAside = false;
  	}


    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
    var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        // At least Safari 3+: "[object HTMLElementConstructor]"
    var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
    var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
    if(!isFirefox && !isChrome){
      alert('Warning ! for now this e-publication is developped for firefox or chrome latest versions, you may encounter some bugs if visiting it with this browser!');
    }

  	var initWatchers = function(){
      //gspreadsheet update deactivated for now, because updating everything breaks scroll-related interactions
      //todo : diff update only on changed elements
     /* $rootScope.$on('markdownUpdate', function(e, data){
        $scope.contents.html = data.html;
        $scope.$apply();
      });*/

      $rootScope.$on('zoteroBibliography', function(e,data){
        $scope.contents.bibliography = data;
      });

  	}

  	var initFunctions = function(){
  		reloadMarkdown('data/clues-anomalies-understanding.md');
  	}

    //I load and then process a modulo-markdown file and apply changes
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
              if(!$scope.popupAside){
                updateAside(screenYCenter, scrollTop, height);
              }
            });
          }, function(data){//second callback for asynchronous updates
            $scope.contents.html = data.html;
            $scope.$apply();
          });

        }, true);
  		}).error(function(d){

  		});
  	};

    //I parse the library of views and set the one which is the closest to screen's y center and define it as aside data
    var updateAside = function(screenYCenter, scrollTop, height){
      if($scope.contents.library){
        var min = Infinity, wining;
        for(var i in $scope.contents.library){
          var vis = $scope.contents.library[i];
          //get element
          var el = $('[title="'+vis.title+'"]');//angular.element(document.querySelector('title', vis.title));
          //get scroll top
          if(el.offset()){
            vis.top = el.position().top;
            //defining closest to screen's center
            var dist = Math.abs(vis.top - screenYCenter);
            if(dist < min && screenYCenter >= vis.top){
              min = dist;
              wining = i;
              console.log(vis.top, el.offset().top, vis.title);
            }
          }
        }
        if(wining && $scope.contents.library[wining]){
          $scope.asideData = $scope.contents.library[wining];
          setTimeout(function(){
            $scope.$apply();
          })
        }
      }
    }

    $scope.setAside = function(title){
      if($scope.asideData){
        if($scope.asideData.title === title){
          $scope.resetAside();
          return;
        }
      }
      if($scope.contents.library){
        for(var i in $scope.contents.library){
          var view = $scope.contents.library[i];
          if(view.title == title){
            $scope.previousAside = $scope.asideData;
            console.log($scope.asideData);
            $scope.asideData = view;
            $scope.popupAside = true;
            setTimeout(function(){
              $scope.$apply();
            });
          }
        }
      }
    }

    $scope.resetAside = function(){
      $scope.popupAside = false;
      var previous = $scope.asideData && $scope.previousData && $scope.asideData.title != $scope.previousAside.title;
      if(previous){
        $scope.asideData = $scope.previousAside;
      }else{
        $scope.asideData = undefined;
      }
      setTimeout(function(){
        $scope.$apply();
      });
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
