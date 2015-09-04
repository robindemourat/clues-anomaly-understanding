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
          console.info('fetching', view.data);
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
                datum.value = +d[view.models.value];
             // }

             if(view.models.value){
                datum.value = +d[view.models.value];
             }

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

            //if no values count occurences for each featured date
            if(!view.models.value){
              view.filteredData = view.filteredData.map(function(obj){
                var temp = d3.nest().key(function(d){
                                        return d.date;
                                      })
                                      .entries(obj.values);
                //obj.value = obj.values.length;
                temp = temp.map(function(day){
                  var nday = {};
                  nday.date = day.key;
                  nday.value = day.values.length;
                  nday.id = obj.key;
                  return nday;
                });
                obj.values = temp;
                return obj;
                //delete obj.values;
                //console.log(obj);
              });
            }
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
      //console.log(obj.begindate, obj.enddate, obj.dateformat, obj);
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
  })


//dicto
    .factory('dictoModuloViewParser', function () {
    var factory = {};

    /*
    SRT TO JSON CONVERSIONS
    */

    //srt to json regexps
    var catchMeta = /\/*(?:(\n*)?Dicto metadata(.*)?\n?)((.|[\n\r])*)[\n|\r]*\*\//gi;
    var catchSubtitles = /([\d]+)(?:[\n|\r]*)([\d]+):([\d]+):([\d]+)(?::|,)([\d]+) ?--> ?([\d]+):([\d]+):([\d]+)(?::|,)([\d]+)((.|[\n\r])*)/gi;
    var catchSrtFields = /\^\^(.*):(.*)/gi;


    //I parse a srt-dicto file for valid dicto metadata (/*dicto metadata ... */) and return a json object
    var processMeta = function(str){
      var matchMeta, meta;
      while(matchMeta = catchMeta.exec(str)){
        meta = matchMeta[3];
      }
      if(!meta)
        return undefined;
      var str = meta.split(/\r?\n/);

      var output = {}, vals;
      for(var i in str){
        vals = str[i].split(':');
        if(vals.length > 1){
          var key = vals[0];
          vals.shift();
          var value = vals.join(':').trim();

          if(key === 'tags'){
            var tags = value.split(',');
            tags = tags.map(function(s) { return s.trim() });
            var jList = [];
            for(var n in tags){
              var out = {};
              tags[n] = tags[n].split(':');
              if(tags[n].length > 1){
                out.title = tags[n][0].trim();
                out.color = tags[n][1].trim();
              }else{
                out.title = tags[n][0];
              }
              jList.push(out);
            }
            output.tags = jList;
          }else{
            output[key] = value;
          }
        }
      }
      return output;
    }


    //I parse a srt-dicto file for valid enriched subtitles (markdown + ^^key:value data) and returns a json array
    var processSubs = function(str){
      //done in two steps for now : 1.isolate blocks through double-breaks 2. validating and parsing blocks that are subtitles
      var blocks, output = [];
      //1.isolate blocks through double-breaks
      blocks = str.split(/\n\s*\n/g);


      for(var i in blocks){
        var sub = {};
        var match, j = 10, data = '';

        //2.parse blocks
        while(match = catchSubtitles.exec(blocks[i])){
          //TODO : replace and compress
          var stIndex = +match[1];
          var hoursIn = +match[2];
          var minIn = +match[3];
          var secIn = +match[4];
          var miliSecIn = +match[5];
          var hoursOut = +match[6];
          var minOut = +match[7];
          var secOut = +match[8];
          var miliSecOut = +match[9];

          while(match[j]){
            data += match[j];
            j++;
          }
          sub.begin = hoursIn * 3600 + minIn * 60 + secIn + miliSecIn/1000;
          sub.end = hoursOut * 3600 + minOut * 60 + secOut + miliSecOut/1000;

          var match2;

          while(match2 = catchSrtFields.exec(data)){
            if(match2[1] == 'tags'){
              var tags = match2[2].split(',');
              tags = tags.map(function(s) { return s.trim() });
              sub.tags = tags;

            }else{
              sub[match2[1]] = match2[2];
            }

            data = data.replace(match2[0], '');//erase xpression from contents field
          }
          sub.content = data.trim();
        }
        //3.validate if subtitle : then add to list
        if(sub.begin && sub.end && sub.content)
          output.push(sub);
      }
      return output;
    }

     //I turn a md-dicto transcription into a json object
    var dictoSrtToJson = function(str){
      var meta = processMeta(str);
      var transcriptions = processSubs(str);
      return {
        metadata : meta,
        data : transcriptions
      };
    }

    /*
    PARSING FUNCTIONS
    */


    var parseJsonTranscription = function(raw){
      try{
        var json = JSON.parse(raw);
        if(!json.data){
          return {
            error : 'Your json file must have a data property'
          }
        }else{
          var newObj = {
            data : []
          };

          if(json.metadata){
            newObj.metadata = json.metadata;
          }

          for(var i in json.data){
            var t = json.data[i];

            if(typeof t.begin == 'number' && typeof t.end == 'number' && typeof t.content == 'string'){
              newObj.data.push(t);
            }
          }

          return {
            data : newObj
          }
        }

      }catch(e){
        return {
          error : 'Your json file is badly formatted'
        };
      }
    }


    var parseSrtTranscription = function(raw){
      var output = dictoSrtToJson(raw);
      return output;
    }

    var parseJsonMontage = function(raw){
      try{
        var json = JSON.parse(raw);
        if(!json.data){
          return {
            error : 'Your json file must have a data property'
          }
        }
      }catch(e){
        return {
          error : 'Your json file is badly formatted'
        };
      }
    }

    var parseSrtMontage = function(raw){

    }

    factory.parseSrtTranscription = parseSrtTranscription;

    factory.importFile = function(file, type, callback){
      //console.log(file);
      var fR = new FileReader(),
          extension = file._file.name.split('.')[file._file.name.split('.').length - 1],
          result = {};
      fR.addEventListener("load", function(event) {
          var textFile = event.target,
              raw = textFile.result;

          if(type == 'transcription'){
            if(extension == 'json'){
              result = parseJsonTranscription(raw);
            }else if(extension == 'srt'){
              result = parseSrtTranscription(raw);
            }
          }else{
            if(extension == 'json'){
              result = parseJsonMontage(raw);
            }else if(extension == 'srt'){
              result = parseSrtMontage(raw);
            }
          }
          if(!result)
              result = {};

          return callback(result.data, result.error);
      });

      //Read the text file
      fR.readAsText(file._file);

    }

    return factory;
  });

