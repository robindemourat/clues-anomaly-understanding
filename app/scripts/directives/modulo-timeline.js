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
  .directive('moduloTimeline', function (TimelineModuloViewParser) {
    return {
      restrict: 'AC',
      scope : {
      	newdata : "@moduloContent"
      },
      link: function postLink($scope, $element, $attrs) {
        $element.text('... Loading timeline data ...');

        $scope.$watch('newdata', function(nouv, old){
        	try{
        		$scope.data = JSON.parse(nouv);
        		
        	}catch(e){
        		console.error('invalid json data for timeline :',nouv);
        	};
        	if($scope.data){
        		//console.info('parsing ', $scope.data);
        		TimelineModuloViewParser.parse($scope.data, function(d, e){
        			$element.text('... Timeline data loaded, processing ...');
        		});
        	}
        });


        
      }
    };
  });








