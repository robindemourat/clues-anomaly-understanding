'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:moduloTimeline
 * @description
 * # moduloTimeline
 */

 /*
A timeline is composed of columns.
Columns are composed of layers.
Each layer corresponds to a view.
A view is made of :
- possibly : a model, which decides how to interpret incoming data (basically, interpreting a table to make properties fit with vis's needs)
- some data (an array of strings, numbers, or simple objects)
- possibly : a filter on the data to display

The global timeline starts with :
- a timespan
- a title
- some slides
- a comment ?
*/

/*
Minimum model for an event view :
- date
- ends
- title
- tags
- desc
*/

/*
Input data model with one source :
{
	data : "String(url)|String(data)",
	title : "String",
	from : "String|AbsDate|DateObj",
	to : "String|AbsDate|DateObj",
	filters : [
		{
			
		}
	],
	model : {
		[visKey] : [dataAccessor]
	},
	css : "String (url)",
	slides : [
		{
			from : "String|AbsDate|DateObj",
			to : "String|AbsDate|DateObj",
			filters : [],
			title : "String",
			comment : "String"
		}
	]
}

{
	columns : [
		{
			title : "String",
			layers : [
				{
					data : "String(url)|String(data)",
					filters : [
						{
							
						}
					],
					model : {
						[visKey] : [dataAccessor]
					}
				}
			]
		}
	],
	title : "String",
	from : "String|AbsDate|DateObj",
	to : "String|AbsDate|DateObj",
	filters : [
		{
			
		}
	],
	model : {
		[visKey] : [dataAccessor]
	},
	css : "String (url)",
	slides : [
		{
			from : "String|AbsDate|DateObj",
			to : "String|AbsDate|DateObj",
			filters : [],
			title : "String",
			comment : "String",
			"layers" : [
				"String(layer name)"
			]
		}
	]
}

*/

angular.module('moduloAnomaliesApp')
  .directive('moduloTimeline', function (TimelineModuloViewParser, $timeout) {
    return {
      restrict: 'AC',
      templateUrl : 'views/modulo-timeline.html',
      scope : {
      	newdata : "@moduloContent"
      },
      link: function postLink($scope, $element, $attrs) {
        $scope.msg = '... Loading data timeline ...';

        var mainContainer = d3.select($element[0]).select('.modulo-timeline-main-timeline'),
        	globalScale = d3.scale.linear().range([0,100]);

        var updateMainSvg = function(data){
        	globalScale.domain([data.minDate.abs, data.maxDate.abs]);
        	var render = [], nbCols = data.columns.length;
        	for(var i in data.columns){
        		for(var j in data.columns[i].layers){
        			for(var k in data.columns[i].layers[j].filteredData){
        				var d = data.columns[i].layers[j].filteredData[k];
        				d.column = +i;
        				d.layer = +j;
        				render.push(d);
        			}
        		}
        	}
        	var events = mainContainer
        				.selectAll('.modulo-timeline-event')
        				.data(render);

        	var enter = events
        					.enter()
        					.append('circle')
        					.attr('class', 'modulo-timeline-event')
        					.attr('cx', function(d){
        						return (100/nbCols)*d.column + (50/nbCols)+'%';//center

        					})
        					.attr('cy', function(d){
        						
        						return (d.date.date)?globalScale(d.date.date.getTime())+'%':0;
        					})
        					.attr('fill', 'white')
        					.attr('stroke', 'black')
        					.attr('r', 5)
        					.on('click', function(d){
        						if(!$scope.higlighted)
        							$scope.highlighted = d;
        						else $scope.highlighted = undefined;
        					});

        }

        $scope.$watch('newdata', function(nouv, old){
        	try{
        		$scope.temp = JSON.parse(nouv);
        		
        	}catch(e){
        		console.error('invalid json data for timeline :',nouv);
        		scope.msg = 'Failed to load due to badly formatted json !'
        	};
        	if($scope.temp){
        		TimelineModuloViewParser.parse($scope.temp, function(d, e){
        			console.info('timeline date processed, ', d);
        			
        			$timeout(function(){
        				$scope.data = d;
        				$scope.msg = undefined;
        				if(!$scope.$$phase)
	        				$scope.$apply();
	        			updateMainSvg($scope.data);
        			});
        		});
        	}
        });


        
      }
    };
  });








