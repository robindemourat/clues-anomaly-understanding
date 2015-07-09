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


//todo : harmonize d3 syntax
angular.module('moduloAnomaliesApp')
  .directive('moduloTimeline', function (TimelineModuloViewParser, $timeout, $window) {
    return {
      restrict: 'AC',
      templateUrl : 'views/modulo-timeline.html',
      scope : {
      	newdata : "@moduloContent"
      },
      link: function postLink($scope, $element, $attrs) {
        $scope.msg = '... Loading data timeline ...';

        var mainContainer = d3.select($element[0]).select('.modulo-timeline-main-timeline'),
            liftContainer = d3.select($element[0]).select('.modulo-timeline-lift-content'),
            liftHeight = angular.element(liftContainer[0][0]).height(),
            globalScale = d3.scale.linear().range([0,100]),
        	relativeScale = d3.scale.linear().range([0,100]),
            liftScale = d3.scale.linear().range([0,liftHeight]),
            liftTimeScale= d3.scale.linear().domain([0,1]),
            colors = d3.scale.category10();




        var brush = d3.svg.brush()
                    .y(liftScale)
                    .extent([.3, .3])
                    .on("brushstart", brushstart)
                    .on("brush", brushmove)
                    .on("brushend", brushend);

        var onWheel = function(){
            var delta = (d3.event.wheelDelta);
            if($scope.extent){

                var dif= $scope.extent.end - $scope.extent.begin;
                dif = (delta > 0)?dif:-dif;
                if($scope.extent.begin + dif * .05 >= $scope.data.minDate.abs && $scope.extent.end + dif * .05 <= $scope.data.maxDate.abs ){
                    $scope.extent = {
                        begin : $scope.extent.begin + dif * .05,
                        end : $scope.extent.end + dif * .05
                    }
                    setBrushExtent($scope.extent);
                    updateMainSvg($scope.data);
                }

            }
        }

        mainContainer
            .on("mousewheel.zoom", onWheel)
            .on("DOMMouseScroll.zoom", onWheel) // disables older versions of Firefox
            .on("wheel.zoom", onWheel) // disables newer versions of Firefox

        liftContainer
            .on("mousewheel.zoom", onWheel)
            .on("DOMMouseScroll.zoom", onWheel) // disables older versions of Firefox
            .on("wheel.zoom", onWheel) // disables newer versions of Firefox

        function resizeBrush(){
            liftContainer.select('.background')
                .attr('height', function(){
                    return liftHeight + 'px';
                });
            if($scope.extent){
                setBrushExtent($scope.extent);
            }
        }

        function brushstart() {
          liftContainer.classed("selecting", true);
        }

        function brushmove() {
            var extent = d3
                    .event
                    .target;
            if(!extent.empty()){
                extent = extent.extent();
                $scope.extent = {
                    begin : liftTimeScale(extent[0]),
                    end : liftTimeScale(extent[1])
                };
            }
            updateMainSvg($scope.data);

        }

        function brushend() {
            var extent = d3
                    .event
                    .target;
            if(extent.empty()){
                $scope.extent = {
                    begin : $scope.initialExtent.begin,
                    end : $scope.initialExtent.end
                }
                setBrushExtent($scope.extent);
            }else{
                console.log(extent.extent());
                extent = extent.extent();
                $scope.extent = {
                    begin : liftTimeScale(extent[0]),
                    end : liftTimeScale(extent[1])
                };
            }
            updateMainSvg($scope.data);
            liftContainer.classed("selecting", !d3.event.target.empty());
        }


        function setBrushExtent(extent){
            //set brush-compatible extent from $scope.extent (in abs time)
            var rel =[globalScale(extent.begin)/100,
                        globalScale(extent.end)/100]
            brush.extent(rel);
            // now draw the brush to match our extent
            brush(d3.select(".brush").transition());
            // now fire the brushstart, brushmove, and brushend events
            brush.event(d3.select(".brush").transition().delay(1000));
        }


        var brushg = liftContainer
                        .append("g")
                        .attr("class", "brush")
                        .call(brush)
                        .call(resizeBrush);

        brushg.selectAll("rect")
                .attr("width", '100%');



        var parseOriginalBrush = function(data){
            if(data.initialExtent){
                var extent = data.initialExtent;
                $scope.initialExtent = {
                    begin : extent.begin.getTime(),
                    end : extent.end.getTime()
                };
            }else{
                $scope.initialExtent = {
                    begin : data.minDate.abs,
                    end : data.maxDate.abs
                }


            //brush.extent([globalScale($scope.extent.begin)/100, globalScale($scope.extent.end)/100]);
            }
        }

        //I redraw a timeline basing on input data
        var updateMainSvg = function(data){
        	globalScale.domain([data.minDate.abs, data.maxDate.abs]);
            liftTimeScale.range([data.minDate.abs, data.maxDate.abs]);

            parseOriginalBrush(data);
            if(!$scope.extent){
                $scope.extent = {
                    begin : $scope.initialExtent.begin,
                    end : $scope.initialExtent.end
                };
                setBrushExtent($scope.extent);
            }
            relativeScale.domain([$scope.extent.begin, $scope.extent.end]);


        	var render = [],
                nbCols = data.columns.length,
                colDisplay = (50/nbCols),
                date;

            data.columns.forEach(function(column, i){
                column.layers.forEach(function(layer, j){
                    layer.filteredData.forEach(function(d){
                        d.column = +i;
                        d.layer = +j;
                        //time filter
                        if(d.date.date){
                            date = d.date.date.getTime();
                            if(date >= $scope.extent.begin && date <= $scope.extent.end){
                                render.push(d);
                            }
                        }
                    })
                })
            })

        	var events = mainContainer
            				.selectAll('.modulo-timeline-event')
            				.data(render, function(d){
                                return d.id;
                            });

            var exit = events
                            .exit()
                            .attr('r', 5)
                            .transition()
                            .duration(300)
                            .attr('cy', function(d){
                                var distToBegin = d.date.date.getTime() - $scope.extent.begin;
                                var distToEnd = $scope.extent.end - d.date.date.getTime();
                                if(distToBegin < distToEnd){
                                    return 0;
                                }else return '100%';
                                //return (d.date.date) ? globalScale(d.date.date.getTime())+'%' : 0;
                            })
                            .attr('r', 0.01)
                            .remove();


        	var enter = events
        					.enter()
        					.append('circle')
        					.attr('class', 'modulo-timeline-event')
        					.attr('cx', function(d){
        						return (100/nbCols)*d.column + colDisplay+'%';//center
        					})
        					.attr('cy', function(d){
                                var distToBegin = d.date.date.getTime() - $scope.extent.begin;
                                var distToEnd = $scope.extent.end - d.date.date.getTime();
                                if(distToBegin < distToEnd){
                                    return 0;
                                }else return '100%';
        						//return (d.date.date) ? globalScale(d.date.date.getTime())+'%' : 0;
        					})
                            .style('fill', function(d){
                                return  colors(d.layer);
                            })
        					.on('click', function(d){
        						if(!$scope.higlighted)
        							$scope.highlighted = d;
        						else $scope.highlighted = undefined;
        					});
            events
                .transition()
                .duration(300)
                .attr('cx', function(d){
                        return (100/nbCols)*d.column + colDisplay+'%';//center
                            })
                .attr('cy', function(d){

                    return (d.date.date) ? relativeScale(d.date.date.getTime())+'%' : 0;
                });



            //updateLiftSvg(render);

        };

        var updateLiftSvg = function(render){

            var events = liftContainer
                         .selectAll('.modulo-timeline-lift-event')
                         .data(render);


            //enter
            var enter =  events
                            .enter()
                            .append('line')
                            .attr('class', 'modulo-timeline-lift-event')
                            .attr('x1', '40%')
                            .attr('x2', '60%')
                            .attr('y1', function(d){
                                return (d.date.date) ? globalScale(d.date.date.getTime())+'%' : 0;
                            })
                            .attr('y2', function(d){
                                return (d.date.date) ? globalScale(d.date.date.getTime())+'%' : 0;
                            });
            //update
            //exit
            var exit = events.exit().remove();
            setBrushExtent($scope.extent);
        }

        /*
        TRIGGERS
        */

        angular.element($window).bind('resize', function() {
               liftHeight = angular.element(liftContainer[0][0]).height();
               liftScale.range([0, liftHeight]);
               resizeBrush();
        });

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
                        var id = 0;
                        d.columns.forEach(function(column, i){
                            column.layers.forEach(function(layer, j){
                                layer.filteredData.forEach(function(d){
                                    d.id = id;
                                    id++;
                                })
                            })
                        });
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








