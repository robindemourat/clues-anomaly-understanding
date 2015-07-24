'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:moduloSankey
 * @description
 * # moduloSankey
 */
angular.module('moduloAnomaliesApp')
  .directive('moduloSankey', function (d3sankey, $window) {
    return {
      templateUrl: 'views/modulo-sankey.html',
      restrict: 'CE',
      link: function postLink($scope, element, attrs) {

        var vis = d3.select(element[0]).select('.vis'),
            visA = angular.element(element).find('.vis'),
            width = visA.width(),
            height = visA.height(),
            duration = 500,
            totalValues,
            maxStep;

        var findNode = function(array, key, name){
          var out;
          array.forEach(function(obj){
            if(obj.name === name && obj.key === key){
              out = obj;
            }
          });
          return out;
        }

        var prepareData = function(data, callback){
          if(!data.keys)return;
          var visData = {
            nodes : [],
            links : []
          };
          d3.csv(data.data, function(objects){
            data.keys.forEach(function(key, i){
              objects.forEach(function(object){
                var name = object[key];
                var node = findNode(visData.nodes, key, name);
                if(!node){
                  visData.nodes.push({
                    step : i,
                    name : name,
                    key : key,
                    id : name + key,
                    value : 0
                  });
                }else{
                  node.value++;
                }
              });
            });

            visData.nodes.forEach(function(node1, i){
              visData.nodes.forEach(function(node2, j){
                if(/*i != j && node1.step < node2.step*/node1.step === node2.step - 1){
                  visData.links.push({
                    source : i,
                    target : j,
                    value : 0
                  });
                  objects.forEach(function(object){
                    if(object[node1.key] === node1.name && object[node2.key] === node2.name){
                      visData.links[visData.links.length - 1].value ++;
                    }
                  });
                }
              })
            });
            return callback(visData);
          });
        };

        var resize = function(){
          width = visA.width();
          height = visA.height();
          d3.select(element[0]).select('.global-group')
            .attr('transform', function(){
                      return 'translate('+width+')rotate(90)';
                    });
        }

        //sankey invariant params
        var sankey = d3.sankey()
            .nodeWidth(15)
            .nodePadding(0);
        var path = sankey.link();
        var color = d3.scale.category20();


        //set and init svg groups
        vis = vis.append('g')
                    .attr('class', 'global-group')
                    .attr('transform', function(){
                      return 'translate('+width+')rotate(90)';
                    });
        vis.append('g').attr('class', 'links');
        vis.append('g').attr('class', 'nodes');


        var heightFromTag = function(d){
            //calculating height of the corresponding label
                var elTag = '.label-wrapper:contains("'+d.key+'") p';
                var height = angular.element(element).find(elTag).height();
                return height;
        };

        var commentOnLink = function(d) {
          var perc = parseInt((d.value/totalValues)*100);
          var text = "";
          if($scope.temp.sankeytype === 'questionnaire'){
            text = "" + d.value;
            text += (d.value > 1)?' respondents ':' respondent ';
            text += '('+perc+'%) answered both\n';
            text +='"'+d.source.name+'" to the question : '+d.source.key+',\n';
            text += 'and "'+d.target.name+'" to the question : '+d.target.key+'\n';
          }else{
            text += d.value + ' ('+perc+'%)';
          }

          return text;
         };

        var commentOnNode = function(d) {
          var perc = parseInt((d.value/totalValues)*100);
          if($scope.temp.sankeytype === 'questionnaire'){
            return d.value + ' respondents answered "'+d.name + '" ('+perc+'%)';
          }else return d.value + ' ('+perc+'%)';
        }

        var updateVis = function(data){

          sankey
            .size([height, width])
            .nodes(data.nodes)
            .links(data.links)
            .layout(32);


          console.log(width, height);

          maxStep = d3.max(data.nodes, function(d){
            return d.step;
          });

          totalValues = d3.sum(data
                                    .nodes
                                    .filter(function(d){
                                              return d.step === 0;
                                    }), function(d){
                                          return d.value;
                                        });



          //select links
          var link = vis.select(".links").selectAll(".link")
                      .data(data.links);

          //enter links
          var enterLink = link
                      .enter().append("path")
                        .attr("class", "link")
          enterLink.append('title');
          //update links
          link
            .transition().duration(duration)
            .attr("d", path)
            .style("stroke-width", function(d) { return Math.max(1, d.dy); })
            .sort(function(a, b) { return b.dy - a.dy; });

          link.select("title")
             .text(commentOnLink);
          //exit links
          link.exit().remove();

          //link interactions
          enterLink.on('click', function(d){
            if(!d.displayInfo){
              d.displayInfo = true;
            }else d.displayInfo = !d.displayInfo;
            if(d.displayInfo)
              $scope.info = commentOnLink(d);
            else delete $scope.info;
            setTimeout(function(){$scope.$apply()});

          });


          //select nodes
          var node = vis.select(".nodes").selectAll(".node")
              .data(data.nodes)

          //enter nodes
          var enterNode = node.enter().append("g")
              .attr("class", "node")
              .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });



          enterNode.append("rect")
          enterNode.append('text');
          enterNode.append('title');

          //update nodes
          node
            .transition().duration(duration)
            .attr("transform", function(d, i) {
              if(d.step == 0){
                return "translate(" + d.x + "," + d.y + ")";
              }
              else if(d.step == maxStep){
                return "translate(" + (d.x - heightFromTag(d)) + "," + d.y + ")";
              }
              else return "translate(" + (d.x - heightFromTag(d)/2) + "," + d.y + ")";
          });



          node.select('rect')
              .transition().duration(duration)
              .attr("height", function(d) { return d.dy; })
              //.attr("width", sankey.nodeWidth())
              .attr('width', heightFromTag)
                              //return sankey.nodeWidth();

              .style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })
              .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })

          node.select("title")
              .text(commentOnNode);

          node.select("text")
              .attr("x", function(d){
                return 0;//heightFromTag(d)/2;
              })
              .attr("y", function(d) { return 0;/*d.dy / 2;*/ })
              .attr("dy", ".5em")
              .attr("text-anchor", "middle")
              .attr("transform", function(d){
                return 'translate('+heightFromTag(d)/2+','+d.dy/2+')'+'rotate(-90)';
              })
              .text(function(d) { return d.name; })
              .style('display', function(d, i, e){
                var width = d3.select(this)[0][0].getBBox().width;
                if(width > d.dy)
                  return 'none';
                else return null;
              })

          //nodes events
          enterNode.selectAll('rect,text').on('mouseover', function(d, i){
            var data = d;
            link.filter(function(d){
              return d.source.id === data.id || d.target.id === data.id;
            }).style('opacity', 1)
          }).on('mouseout', function(d){
            var data = d;
            link.filter(function(d){
              return d.source.id === data.id || d.target.id === data.id;
            }).style('opacity', .2)
          }).on('click', function(d){
            if(!d.displayInfo){
              d.displayInfo = true;
            }else d.displayInfo = !d.displayInfo;
            if(d.displayInfo)
              $scope.info = commentOnNode(d);
            else delete $scope.info;
            setTimeout(function(){$scope.$apply()});
          });


          //exit nodes
          node.exit().remove();

        }

        $scope.$watch('newdata', function(nouv, old){
          try{
            var nouvJ = JSON.parse(nouv);
            var oldJ;

            if(old){
              oldJ = JSON.parse(old);
            }
            if(nouvJ.title != oldJ.title || !$scope.visData){
              $scope.temp = JSON.parse(nouv);
            }else{
              $scope.temp = undefined;
            }

          }catch(e){
            console.error('invalid json data for timeline :',nouv);
            $scope.msg = 'Failed to load due to badly formatted json !'
          };

          if($scope.temp){
            prepareData($scope.temp, function(d){
              resize();
              $scope.visData = d;
              updateVis($scope.visData);
            });
          }
        });

        angular.element($window).bind('resize', function(){
          resize();
          updateVis($scope.visData);
        })
      }
    };
  });
