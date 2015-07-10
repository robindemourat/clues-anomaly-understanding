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
                  obj.rawData = d3.csv.parse(d);
                }else obj.rawData = d;

                resolve(obj);
              })
              .error(function(e){
                reject(e);
              });
          });
        }

    //I download the data from a view's source and return its content through a callback
    var fetchData = function(view, callback){
        var toDownload = [];
        if(view.data){
          console.info('fetching', this.data);
        }else{
          if(!view.columns){
            view.data = undefined;
            return;
          }else{
            view.columns.forEach(function(column, i){
              column.layers.forEach(function(layer, j){
                layer.path = [i,j];
                toDownload.push(fetchSource(layer));
              });
            });
          }

          var obj = view;
          $q.all(toDownload).then(function(results) {

            results.forEach(function(o){
              obj.columns[+o.path[0]]['layers'][+o.path[1]] = o;
              delete obj.columns[+o.path[0]]['layers'][+o.path[1]].path;
            });
           return callback(obj);
        }, function(e){
          return callback(undefined, e);
        });
        }
      };

    //I'm an util aiming as accessing properties in complex properties
    var accessProp = function(obj, accessorArray){
      var i = -1;
      while(++i < accessorArray.length){
        if(!angular.isDefined(obj)){
          return obj;
        }else obj = obj[accessorArray[i]];
      }
      return obj;
    }

    //I take a list of filters descriptions (string) and turn them into filter functions
    var parseFilters = function(filters){

      return (filters && filters.length)?
                filters.forEach(function(f, i){
                  var match;
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
                }):[];
    }

    //I fetch a view's filters, and parse rawData field with each of them, returns a new filteredData field
    var applyFilters = function(view){
      var filteredData = view.rawData.slice();

      for(var i in view.filters){
        filteredData = filteredData.filter(view.filters[i].filter)
      }
      return filteredData;
    }

    //I parse filters for each view, converts them in to functions, and apply them to data
    var processFilters = function(view){

      view.columns.forEach(function(column, i){
        column.layers.forEach(function(layer, j){
          var hasFilters = layer.filters && layer.filters.length;
          if(hasFilters){
            layer.filters = parseFilters(layer.filters);
            layer.filteredData = applyFilters(layer);
          }else{
            layer.filteredData = layer.rawData.slice();
          }

        });
      });

      return view;
    }

    //I convert event layers to modulo-timeline standard model
    var alignModels = function(obj){

      obj.columns.forEach(function(column, a){
        column.layers.forEach(function(view, b){
          if(view.models && view.type === 'events'){
            for(var modelOutput in view.models){
              var modelInput = view.models[modelOutput];
              view.filteredData.forEach(function(d, j){
                d[modelOutput] = d[modelInput];
                delete d[modelInput];
              });
            //convertLayerDates(view);

            }
          }else if(view.models && view.type === "metrics"){
            //cleaning datum object with only the values necessary to the view
            view.filteredData = view.filteredData.map(function(d, i){
              var datum = {};
              //setting the date
              datum.date = d[view.models.datesKey];
              //set the values (question/todo : allow to avoid values specification = keep all values ?)
              /*if(typeof view.models.values != 'string'){
                view.models.values.forEach(function(value){
                  datum[value] = d[value];
                })
              }else{*/
                datum[view.models.values] = d[view.models.values];
             // }

              //set an identifier = either the specified objectsKey or each line of the spreadsheet correspond to the same object
              if(view.models.objectsKey)
                datum.id = d[view.models.objectsKey];
              else datum.id = 0;

              return datum;
            });

            view.filteredData = d3.nest().key(function(d){
              return d.id;
            })
            .entries(view.filteredData);
          }
        })
      });

      return obj;
    }

    var convertLayerDates = function(view){
      var format = d3.time.format(view.dateformat);
      var dateformat = view.dateformat;

      view.filteredData.forEach(function(d, i){
        if(view.type === 'events'){
          try{
            d.date = {
              original : view.filteredData[i].date,
              date : format.parse(d.date)
            }
          }catch(e){
            d.date = {
              original : d.date,
              date : undefined
            }
          }
        }else{
          d.values.forEach(function(datum){
            try{
              datum.date = {
                original : datum.date,
                date : format.parse(datum.date)
              }
            }catch(e){
              datum.date = {
                original : datum.date,
                date : undefined
              }
            }
          })
        }
      });

    };

    //I take as input a timeline data, and parse dates against dateformat option to output them as modulo-date objects
    var convertViewDates = function(obj){
      if(obj.begindate && obj.enddate && obj.dateformat){
        try{
          var format = d3.time.format(obj.dateformat);

          obj.initialExtent = {
            begin : format.parse(obj.begindate),
            end : format.parse(obj.enddate)
          }
        }catch(e){
          obj.initialExtent = undefined;
        }
      }
    }

    var convertDates = function(obj){

      //specific views
      obj.columns.forEach(function(column, a){
        column.layers.forEach(function(view, b){
          convertLayerDates(view);
        });
      });

      return obj;
    }

    var getBoundDates = function(obj){
      var min = Infinity, max = -Infinity, o;

      for(var i in obj.columns){
        for(var j in obj.columns[i].layers){
          for(var k in obj.columns[i].layers[j].filteredData){
            o = obj.columns[i].layers[j].filteredData[k];
            var start = o.date && o.date.date;
            if(start){
              var d = new Date(o.date.date);
              if(d.getTime() < min){

                min = d.getTime();
              }
              if(d.getTime() > max){
                max = d.getTime();
              }
            }
            var end = o.end && o.end.date;
            if(end){
              var d = new Date(o.end.date);
              if(d.getTime() < min){
                min = d.getTime();
              }
              if(d.getTime() > max){
                max = d.getTime();
              }
            }
          }
        }
      }
      obj.minDate = {
        date : new Date(min),
        abs : min
      };
      obj.maxDate = {
        date : new Date(max),
        abs : max
      }
      return obj;
    }

    // Public API here
    return {
      parse: function (view, callback) {
        convertViewDates(view);
        fetchData(view, function(view, e){
          processFilters(view);
          alignModels(view);
          convertDates(view);
          getBoundDates(view);

          return callback(view,e);
        });
      }
    };
  });
