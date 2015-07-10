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

Minimum model for a metrics view :
- (if different types of objects) objectKey (string) : the column containing the identifier of objects
- datesKey (string) : the column that contains the dates
- dateFormat (string) : the d3 formatting instruction for dates
- value (not mandatory) that contain the metrics to be displayed - if not specified it counts
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
  .directive('moduloTimeline', function (TimelineModuloViewParser, $timeout, $window, nova) {
    return {
      restrict: 'AC',
      templateUrl : 'views/modulo-timeline.html',
      scope : {
      	newdata : "@moduloContent"
      },
      link: function postLink($scope, $element, $attrs) {
        $scope.msg = '... Loading data timeline ...';

        var second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24,
            week = day * 7,
            month = day * 31,
            year = day * 365;


        var mainContainer = d3.select($element[0]).select('.modulo-timeline-main-timeline'),
            liftContainer = d3.select($element[0]).select('.modulo-timeline-lift-content'),
            liftWidth = angular.element(liftContainer[0][0]).width(),
            liftHeight = angular.element(liftContainer[0][0]).height(),
            axis = mainContainer.append("g").attr("class", "axis"),
            globalScale = d3.scale.linear().range([0,100]),
        	relativeScale = d3.scale.linear().range([0,100]),
            liftScale = d3.scale.linear().range([0,liftHeight]),
            liftTimeScale= d3.scale.linear().domain([0,1]),
            colors = d3.scale.category20(),
            //colors = d3.scale.linear().range([0,255]),
            ticksScale = d3.time.scale(),
            nova = d3.layout.nova();

        var yAxis = d3.svg.axis();


        $scope.setDetailMode = function(bol){
            setTimeout(function(){
                $scope.detailMode = bol;
                if(!bol){
                    $scope.highlighted = undefined;
                }
                $scope.$apply();
            })
        }

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
                dif = (delta > 0)?-dif:dif;
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
            brush.event(d3.select(".brush")/*.transition().delay(1000)*/);
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

        //I try to make a coherent choice of which timespan to set for timeline bars regarding the length of the period of time that is being covered by the timeline
        var defineTimeSpan = function(range){
            if(range > 2 * month){
                return day;
            }else if(range > 6 * day){
                return hour;
            }else if(range > 1 * day){
                return 10 * minute;
            }else if(range > 2 * hour){
                return 5 * minute;
            }else if(range > minute*10){
                return minute;
            }else if(range > minute){
                return second * 10;
            }else return second;
        }


        //I take a time span in absolute time format, return appropriate d3 ticks formatting settings
        var setTicks = function(time){
            var unit, span, format;
            if(time > year * 50){// > 50 years
                unit = d3.time.year;
                span = 50;
                format = '%Y';
            }else if(time > year * 10){//10 - 50 years
                unit = d3.time.year;
                span = 10;
                format = '%Y';
            }else if(time > year * 3){// 3-10 years
                unit = d3.time.year;
                span = 1;
                format = '%Y';
            }else if(time > year){//1-3 years
                unit = d3.time.month;
                span = 6;
                format = '%B %Y';
            }else if(time > month * 6){//6-12 months
                unit = d3.time.month;
                span = 1;
                format = '%B %Y';
            }else if(time > month){//1-6 months
                unit = d3.time.day;
                span = 15;
                format = '%e %B %Y';
            }else if(time > 15 * day){//15-30 days
                unit = d3.time.day;
                span = 3;
                format = '%e %B %Y';
            }else if(time > day){//1-15 days
                unit = d3.time.day;
                span = 1;
                format = '%e %B %Y';
            }else if(time > 6 * hour){//6-24 hours
                unit = d3.time.hour;
                span = 1;
                format = '%e %B, %I %p';
            }else if(time > hour){//1-6 hours
                unit = d3.time.minute;
                span = 30;
                format = '%H:%M';
            }else if(time > 30 * minute){//30-60 minutes
                unit = d3.time.minute;
                span = 10;
                format = '%H:%M';
            }else if(time > 10 * minute){//10-30 minutes
                unit = d3.time.minute;
                span = 5;
                format = '%H:%M';
            }else if(time > minute){//1-10 minutes
                unit = d3.time.minute;
                span = 1;
                format = '%H:%M';
            }else{
                unit = d3.time.second;
                span = 30;
                format = '%H:%M:%S';
            }

            return {
                unit : unit,
                span : span,
                format : format
            }
        }

        //I update a timeline column
        var updateColumn = function(viewEvents, columnIndex, nbCols, colDisplay, viewMetrics){

            var id = '#timeline-column-' + columnIndex,
                columnContainer = mainContainer.select(id);

            /*
                metrics update
            */
            if(viewMetrics.length > 0){
                var metricsContainer = columnContainer.select('.metrics');
                if(metricsContainer.empty()){
                    metricsContainer = columnContainer.append('g').attr('class', 'metrics');
                }



                var max = -Infinity;
                viewMetrics.forEach(function(object){
                    var localMax = d3.max(object.values, function(d){
                        return d.value;
                    });
                    if(localMax > max)
                        max = localMax;
                });
                var width = (angular.element($element).width() * .9);
                var colWidth = width/nbCols;
                var areaScale = d3.scale.linear().domain([0, max]).range([0, width/nbCols]);
                var areaY = d3.scale.linear()
                                    .domain([$scope.extent.begin, $scope.extent.end])
                                    .range([0, liftHeight]);


                var area = d3.svg.area()
                    .interpolate("linear")
                    .y(function(d) {
                        return (d.date.date) ? areaY(d.date.date.getTime()): 0;
                    })
                    .x0(function(d){
                        return colWidth * columnIndex + colWidth/2 - areaScale(d.value)/2;
                    })
                    .x1(function(d) {
                        return colWidth * columnIndex + colWidth/2 + areaScale(d.value)/2;
                    });

                var areas = metricsContainer.selectAll('.modulo-timeline-area')
                                .data(viewMetrics, function(d){
                                    return d.id;
                                });

                areas.exit().remove();

               var enterAreas = areas.enter()
                                    .append('path')
                                    .attr('class', 'modulo-timeline-area')
                                    .attr('id', function(d){
                                        return 'modulo-timeline-area-'+d.id;
                                    })
                                    .attr('fill', function(d,i){
                                        return colors(i);
                                    })
                                    .append('title')
                                    .text(function(d){
                                        return d.key;
                                    });

                areas.datum(function(d){
                                /*if(d.key === '#brunolatour'){
                                    console.log(d.values.length);
                                }*/
                                return d.values;
                            })
                            .transition()
                            .duration(100)
                            .attr('d', area);





                /*viewMetrics.forEach(function(object){
                                  .datum(object.values)

                });*/

            }

            /*
                events update
            */
            var eventsContainer = columnContainer.select('.events');
                if(eventsContainer.empty()){
                    eventsContainer = eventsContainer.append('g').attr('class', 'events');
                }

            var span = defineTimeSpan($scope.extent.end - $scope.extent.begin);
            //console.log(span);
            nova(viewEvents, function(d){
                return d.date.date.getTime();
            }, function(d){
                return d.id;
            },
            $scope.extent.begin,
            $scope.extent.end,
            span * 50
            );

            var events = columnContainer
                            .selectAll('.modulo-timeline-event')
                            .data(viewEvents, function(d){
                                return d.id;
                            });

            var exit = events
                            .exit()
                            .attr('r', 5)
                            .transition()
                            .duration(100)
                            .attr('cy', function(d){
                                var distToBegin = d.date.date.getTime() - $scope.extent.begin;
                                var distToEnd = $scope.extent.end - d.date.date.getTime();
                                if(distToBegin < distToEnd){
                                    return '-10%';
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
                                return ((100/nbCols) * d.y + (100/nbCols)* d.column) + '%';
                                //return (100/nbCols)*d.column + colDisplay+'%';//center
                            })
                            .attr('cy', function(d){
                                var distToBegin = d.date.date.getTime() - $scope.extent.begin;
                                var distToEnd = $scope.extent.end - d.date.date.getTime();
                                if(distToBegin < distToEnd){
                                    return '-10%';
                                }else return '110%';
                                //return (d.date.date) ? globalScale(d.date.date.getTime())+'%' : 0;
                            })
                            .style('fill', function(d){
                                return d.color;
                            })
                            .on('mouseover', function(d){
                                $scope.highlighted = d;
                                $scope.$apply();
                            })
                            .on('mouseout', function(d){
                                if(!$scope.detailMode){
                                    $scope.highlighted = undefined;
                                    $scope.$apply();
                                }
                            })
                            .on('click', function(d){
                                $scope.highlighted = d;
                                $scope.detailMode = true;
                                $scope.$apply();
                            })
                            /*.append('title')
                            .text(function(d){
                                return d.title;
                            })*/
            events
                .transition()
                .duration(100)
                .attr('cx', function(d){
                    return ((100/nbCols) * d.y + (100/nbCols)* d.column) + '%';
                    //return (100/nbCols)*d.column + colDisplay+'%';//center
                })
                .attr('cy', function(d){
                    return d.x * 100 + '%';
                   // return (d.date.date) ? relativeScale(d.date.date.getTime())+'%' : 0;
                })
                .style('r', function(){
                    return 5//(liftHeight * nova.nodeSize()[0] * .5) + 'px';
                });
        }

        //I redraw a timeline basing on input data
        var updateMainSvg = function(data){
        	globalScale.domain([data.minDate.abs, data.maxDate.abs]);
            liftTimeScale.range([data.minDate.abs, data.maxDate.abs]);




            if(!$scope.extent){
                $scope.extent = {
                    begin : $scope.initialExtent.begin,
                    end : $scope.initialExtent.end
                };
                //setBrushExtent($scope.extent);
            }
            relativeScale.domain([$scope.extent.begin, $scope.extent.end]);

            ticksScale.domain([new Date($scope.extent.begin), new Date($scope.extent.end)])
                        .range([0, liftHeight]);

            var t = setTicks($scope.extent.end - $scope.extent.begin);

            yAxis
                .scale(ticksScale)
                .orient("right")
                .ticks(t.unit, t.span)
                .tickFormat(d3.time.format(t.format));

            axis
                .transition()
                .duration(100)
                .call(yAxis);

            //RENDERING
        	var nbCols = data.columns.length,
                colDisplay = (50/nbCols),
                date;

            data.columns.forEach(function(column, i){
                var events = [], metrics = [];
                column.layers.forEach(function(layer, j){
                    if(layer.type === 'events'){
                        layer.filteredData.forEach(function(d){
                            d.column = +i;
                            d.layer = +j;
                            d.color = layer.color;
                            //time filter
                            if(d.date.date){
                                date = d.date.date.getTime();
                                if(date >= $scope.extent.begin && date <= $scope.extent.end){
                                    events.push(d);
                                }
                            }
                        });
                    }else{
                        layer.filteredData.forEach(function(object, n){
                            object.column = +i;
                            object.layer = +j;
                            object.color = layer.color;
                            object.values = object.initialValues.filter(function(d, n){
                                var dtest = d && d.date && d.date.date;
                                 if(dtest){
                                    date = d.date.date.getTime();
                                    if(date >= $scope.extent.begin && date <= $scope.extent.end){
                                        return true;
                                    }
                                }
                                return false;
                            });

                        });
                        metrics = metrics.concat(layer.filteredData.slice());
                    }
                });
                updateColumn(events, i, nbCols, colDisplay, metrics);
            });
        };

        var updateLiftSvg = function(data){


            var render = [];
            data.columns.forEach(function(column, i){
                column.layers.forEach(function(layer, j){
                    if(layer.type == 'events'){
                        layer.filteredData.forEach(function(d){
                            d.color = layer.color;
                            render.push(d);
                        });
                    }
                })
            });

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
                            })
                            .attr('stroke', function(d){
                                return d.color;
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
               ticksScale.range([0, liftHeight]);
               resizeBrush();
               updateMainSvg($scope.data);
               updateLiftSvg($scope.data);
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

                        //creating columns groups
                        var columns = mainContainer.selectAll('.timeline-column')
                                        .data(d.columns);
                        columns.exit().remove();
                        columns.enter()
                            .append('g')
                            .attr('class', 'timeline-column')
                            .attr('id', function(d,i){
                                return 'timeline-column-' + i;
                            });

        				$scope.data = d;
                        var id = 0;
                        var colorIndex = 0;
                        d.columns.forEach(function(column, i){
                            column.layers.forEach(function(layer, j){
                                layer.filteredData = layer.filteredData.map(function(d){
                                    d.id = id;
                                    id++;
                                     if(layer.type === 'metrics'){
                                        d.values.sort(function(a,b){
                                            return a.date.date - b.date.date;
                                        });
                                        d.initialValues = d.values.slice();
                                       // d.forEach(function())
                                    }
                                    return d;
                                });



                                if(!layer.color){
                                    layer.color = colors(colorIndex);
                                }
                                colorIndex++;
                            });
                        });

                        parseOriginalBrush($scope.data);//todo : just at view change

        				$scope.msg = undefined;
                        setTimeout(function(){
                            $scope.$apply();
                            updateMainSvg($scope.data);
                            updateLiftSvg($scope.data);
                        });

        			});
        		});
        	}
        });



      }
    };
  });








