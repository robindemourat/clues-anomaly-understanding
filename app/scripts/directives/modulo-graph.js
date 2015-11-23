'use strict';

/**
 * @ngdoc directive
 * @name moduloAnomaliesApp.directive:moduloGraph
 * @description
 * # moduloGraph
 */
angular.module('moduloAnomaliesApp')
  .directive('moduloGraph', function ($http, $timeout) {
    return {
      templateUrl: 'views/modulo-graph.html',
      restrict: 'AC',
      link: function postLink($scope, element, attrs) {

        var viewsSettings = [
          {
              labelThreshold: 7,
              drawEdges: true,
              drawNodes : true,
              labelSizeRatio : 2

          }
        ]

        var forceAtlasSettings = [
          {
            worker: true,
            barnesHutOptimize: false,
            linLogMode: true,
            gravity: 1.5,
            barnesHutTheta:2,
            coolDown:10
          },
          {
            worker: true,
            barnesHutOptimize: false,
            linLogMode: true,
            gravity: -10,
            barnesHutTheta:55,
            coolDown:0
          }
        ]

        var forceAtlasTiming = 12000;
        var forceAtlasTimout;

        var nodeToDrop = [];
        var edgeToDrop = [];
        var mode = true;

        var sigInst = new sigma({
          renderer: {
            container: angular.element(element).find('.graph-container')[0],
            type:'openGL',
          },
          settings: {

            defaultNodeColor: "#999999",
            nodesPowRatio : 0.5,
            minNodeSize: 1,
            labelColor: "node",

            defaultNodeBorderColor: "#ffffff",

            edgeColor: 'default',
            defaultEdgeColor: '#999999',

            labelSize: "proportional"
          }
        });

        function randomPosition(sigInst){
          sigInst.graph.nodes().forEach(function(n){
            n.x = Math.random() * 3000;
            n.y = Math.random() * 3000;
          });
          sigInst.refresh();
        }
        function spatialization(sigInst, forceAtlasSettings){

          sigInst.startForceAtlas2(forceAtlasSettings);
          forceAtlasTimout = setTimeout(function(){sigInst.killForceAtlas2()}, forceAtlasTiming);

          // OR randomize node to have a good Spatialization ?
          randomPosition(sigInst);
        }

        function spatializationKill(sigInst){
          clearTimeout(forceAtlasTimout);
          if(sigInst.isForceAtlas2Running())sigInst.killForceAtlas2()
        }



        var reload = function(data){
          sigma.parsers.gexf(data.data, sigInst ,function(){
            window.s = sigInst;
            // default settings
          sigInst.settings(viewsSettings[0]);
            // SET COLORS
            if(data.colors){
              var key = data.colors.keyAttribute;
              var defaultColor = data.colors.default;
              var colors = data.colors.specialColors;

              sigInst.graph.nodes().forEach(function(n){

                // set colors according to type
                var hasColor = false;
                for(var i in colors){
                  if(n.attributes[key] == i){
                    n.color = colors[i];
                    hasColor = true;
                  }
                }
                if(!hasColor)
                  n.color = defaultColor;


                // upper case labels
                n.label =  n.label.toUpperCase();


              });
            }

            //FILTER GRAPH
            if(data.filters){
              var filters = data.filters;
              var idsToDelete = [];
              sigInst.graph.nodes().forEach(function(n){
                data.filters.forEach(function(filter){
                  if(filter.active){
                    filter.hide.forEach(function(hide){
                      if(hide.keyType === 'attribute'){
                        if(n.attributes[hide.keyAttribute] === hide.value){
                          sigInst.graph.dropNode(n.id);
                          idsToDelete.push(n.id);
                        }
                      }else{
                        if(n.label === hide.value){
                          sigInst.graph.dropNode(n.id);
                        }
                      }
                    });
                    //update settings
                    if(filter.settings){
                      sigInst.settings(filter.settings);
                    }
                  }

                })
              });

              //filter edges
              sigInst.graph.edges().forEach(function(edge){
                idsToDelete.forEach(function(id){
                  if(edge.source === id || edge.target === id){
                    sigInst.graph.dropEdge(edge.id);
                  }
                })
              });

            }

            // lanch a first spatialization with crazy settings to shuffle nodes
            spatialization(sigInst, forceAtlasSettings[1]);

            // lanch the normal spatialization
            setTimeout(function(){
              spatializationKill(sigInst);
              spatialization(sigInst, forceAtlasSettings[0]);
            },200);

          });
        };

        //for now, quick and dirty update (clear then redraw)
        //todo : d3-style update
        $scope.switchFilter = function(filter, index){
          sigInst.graph.clear();
          spatializationKill(sigInst);

          $scope.newD.filters[index].active = !$scope.newD.filters[index].active;
          reload($scope.newD);
        }



        $scope.$watch('newdata', function(nouv, old){
          if(nouv.trim().length == 0)return;
          try{
            var newD = JSON.parse(nouv), oldD;
            if(old){
              oldD = JSON.parse(old);
            }
            var oldT = (oldD)?oldD.title:undefined;
            if(newD.title !== oldD.title || !$scope.newD){
              $scope.newD = newD;
              reload($scope.newD);
            }
          }catch(e){
            console.error('invalid json data for graph :',nouv);
            $scope.msg = 'Failed to load due to badly formatted json !'
          };
        });

        $scope.export = function(){
            sigInst.toSVG({download: true, labels : true, filename: 'mygraph.svg', size: 1000});
        }
      }
    };
  });
