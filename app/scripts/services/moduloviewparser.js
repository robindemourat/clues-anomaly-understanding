'use strict';

/**
 * @ngdoc service
 * @name moduloAnomaliesApp.ModuloViewParser
 * @description
 * # ModuloViewParser
 * Factory in the moduloAnomaliesApp.
 */
angular.module('moduloAnomaliesApp')
  .factory('TimelineModuloViewParser', function ($q, $http) {
    var matchFileExtension = /\.(\w*)$/gi,
        parseFilter = /(.*)([\!\=><][\!\=><])(.*)/gi;

    //I fetch data from a ModuloView object, and resolve with the same object with fetched data embeded
    var fetchSource = function(obj){
          return $q(function(resolve, reject){
            console.info('fetching ', obj.data);
            $http
              .get(obj.data)
              .success(function(d){
                console.info('got ',obj.data);
                obj.extension = obj.data.match(matchFileExtension)[0];
                if(obj.extension === '.csv'){
                  obj.rawData = csvJS(d);
                }else obj.rawData = d;

                resolve(obj);
              })
              .error(function(e){
                reject(e);
              });
          });
        }


      var fetchData = function(view, callback){
        var toDownload = [];
        if(view.data){
          console.info('fetching', this.data);
        }else{
          if(!view.columns){
            view.data = undefined;
            return;
          }else{
            for(var i in view.columns){
              for(var j in view.columns[i].layers){
                view.columns[i].layers[j].path = [i,j];
                toDownload.push(fetchSource(view.columns[i].layers[j]));
              }
            }
          }
          var obj = view;
          $q.all(toDownload).then(function(results) {
           for(var i in results){
            var o = results[i];
            obj.columns[+o.path[0]]['layers'][+o.path[1]] = o;
            delete obj.columns[+o.path[0]]['layers'][+o.path[1]].path;
           }
           return callback(obj);
        }, function(e){
          return callback(undefined, e);
        });
        }
      };

    var accessProp = function(obj, accessorArray){
      var i = -1;
      while(++i < accessorArray.length){
        obj = obj[accessorArray[i]];
      }
      return obj;
    }

    //I take a list of filters descriptions (string) and turn them into filter functions
    var parseFilters = function(filters){
      for(var i in filters){
        var f = filters[i], match;
        while(match = parseFilter.exec(f)){
          f = {};
          f.path = match[1].split('.');
          f.expression = match[2];
          f.value = match[3];
          if(f.expression == '=='){
            f.filter = function(d){
              return accessProp(d, f.path) == f.value;
            }
          }else if(f.expression == '!='){
            f.filter = function(d){
              return accessProp(d, f.path) != f.value;
            }
          }else if(f.expression == '<<'){
            f.filter = function(d){
              return +accessProp(d, f.path) < +f.value;
            }
          }else if(f.expression == '>>'){
            f.filter = function(d){
              return +accessProp(d, f.path) > +f.value;
            }
          }else if(f.expression == '>='){
            f.filter = function(d){
              return +accessProp(d, f.path) >= +f.value;
            }
          }else if(f.expression == '<='){
            f.filter = function(d){
              return +accessProp(d, f.path) <= +f.value;
            }
          }
          filters[i] = f;
        }
      }
      var ok = filters && filters.length;
      return (ok)?filters:[];
    }

    //I fetch a view's filters, and parse rawData field with each of them, returns a new filteredData field
    var applyFilters = function(view){
      var filteredData = view.rawData.slice();

      for(var i in view.filters){
        filteredData = filteredData.filter(function(d){
          return view.filters[i].filter(d);
        })
      }
      return filteredData;
    }

    //I parse filters for each view, converts them in to functions, and apply them to data
    var processFilters = function(view){
      for(var i in view.columns){
        for(var j in view.columns[i].layers){
          var hasFilters = view.columns[i].layers[j].filters && view.columns[i].layers[j].filters.length;
          view.columns[i].layers[j].filters = parseFilters(view.columns[i].layers[j].filters);
          view.columns[i].layers[j].filteredData = applyFilters(view.columns[i].layers[j]);
        }
      }
      return view;
    }

    //I convert objects to modulo-timeline standard model
    var alignModels = function(obj){
      for(var a in obj.columns){
        for(var b in obj.columns[a].layers){
          var view = obj.columns[a].layers[b];
          if(view.models){
            for(var modelOutput in view.models){
              var modelInput = view.models[modelOutput];
              for(var j in view.filteredData){
                view.filteredData[j][modelOutput] = view.filteredData[j][modelInput];
                delete view.filteredData[j][modelInput];
              }
            }
          }
          obj.columns[a].layers[b] = view;
        }
      }

      return obj;
    }
    
    function csvJS(csv){
     
      var lines=csv.split("\n"),
          result = [],
          headers=lines[0].split(","),
          obj,
          currentline;
     
      for(var i=1;i<lines.length;i++){
        obj = {};
        currentline=lines[i].split(",");
        for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
        }
        result.push(obj);
      }
      return result;
    }

    // Public API here
    return {
      parse: function (view, callback) {
        fetchData(view, function(view, e){
          view = processFilters(view);
          view = alignModels(view);
          console.log(view);
          return callback(view,e);
        });
      }
    };
  });
