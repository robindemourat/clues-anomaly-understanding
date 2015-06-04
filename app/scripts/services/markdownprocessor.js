'use strict';

/**
 * @ngdoc service
 * @name moduloAnomaliesApp.markdownProcessor
 * @description
 * # markdownProcessor
 * Factory in the moduloAnomaliesApp.
 */
angular.module('moduloAnomaliesApp')
  .factory('markdownProcessor', function (markdownConverter, tabletop, $http, $rootScope, ZoteroQueryHandler, ZoteroQueryBuilder) {
    
    var matchLibElement = /```json([\s\S]*?)```/gi,
        matchTitles = /(#+)(.*)/gi,
        matchSpreadsheets = /\^\^gspreadsheet:(.*)/gi,
        matchTitle = /(.*)\n(\=)+/gi,
        matchZoteroUrl = /\[\^\^zotero:(.*)\]/gi;

    var userId = 1142649,
        apiKey = 'CYeyCcxJpPSxcj1cxgb6fP7Q',
        query = ZoteroQueryBuilder,
        zoteroRefs = [];

    //I get a md file, return a json array of all the views used in the composition
    var buildLibrary = function(text){
      var match;
      var views = [], view, ok, toDelete = [];

      while(match = matchLibElement.exec(text)){
        try{
          view  = JSON.parse(match[1]);
        }catch(e){

        }
        
        ok = view && view.role && view.role === 'modulo-view';
        if(ok){
          toDelete.push(match[0]);
          //add to lib
          views.push(view);
        }
      }
      for(var i in toDelete){
        text = text.replace(toDelete[i], '');
      }
      
      return {
        markdown : text,
        library : views
      }
    };

    var getSpreadsheet = function(url, match, callback){
      console.info('parsing gspreadsheet '+url);
      Tabletop.init( 
        { 
          key: url,
         callback: function(data, tabletop) { 
          console.info('got gspreadsheet from '+url);
          //get the first
          var headers= [], output  = '| ';
          for(var i in data[0]){
            headers.push(i);
          }
          //write md table header
          for(var i in headers){
            output += headers[i] + ' | ';
          }
          output += '\n|';
          for(var i in headers){
            output += '======== |';
          }
          output += '\n';

          for(var i in data){
            output += '| ';
            for(var j in headers){
              var field = headers[j];
              output += data[i][field] + ' |';
            }
            output += '\n'
          }
          return callback({
            toReplace : match,
            replaceWith : output
          });

        },
         simpleSheet: true 
        } );
    };

    var chainSpreadsheet = function(matches, index, callback){
      var match = matches[index];
      getSpreadsheet(match.url, match.toReplace, function(m){
        matches[index] = m;
        if(index == matches.length - 1){
          return callback(matches);
        }else{
          index++;
          chainSpreadsheet(matches, index, callback);
        }
      });
      
    }
    

    //I take a md file, transforms ^^gspreadsheet:url by adding their content
    var extractSpreadsheets = function(text, callback){
      var match, outputs = [], matches = [];

      while(match = matchSpreadsheets.exec(text)){
        var url = match[1];
        matches.push({
          url : match[1],
          toReplace : match[0]
        });
      }
      chainSpreadsheet(matches, 0, function(m){
        matches = m;
        for(var i in matches){
          text = text.replace(matches[i].toReplace, matches[i].replaceWith);
        }
        updateMarkdown(text, function(output){
            $rootScope.$broadcast('markdownUpdate', output);
          });
      });
      return text;
    }

    var slugify = function(str){
      return str
            .toLowerCase()
            .replace(/ /g,'')
            .replace(/[^\w-]+/g,'')
            .replace(/[-_]+/g,'')
            ;
    }

    //I take a md file, returns a table of content
    var makeToc = function(text){
      var toc = [];
      var match, level, title, tag;
      while(match = matchTitles.exec(text)){
        level = match[1].length;
        title = match[2];
        tag = slugify(match[2]);
        toc.push({
          level : level,
          title : title,
          tag : tag
        });
      }

      return toc;
    }

    var extractTitle = function(text){
      var match, title="";
      while(match = matchTitle.exec(text)){
        title = match[1];
      }
      return title;
    }

    var zoteroFetchingHandler = function(items, index, output){
      query.searchItemKey(items[index]);

      ZoteroQueryHandler.getItems(query.get(), function(i){
        output.push(i[0]);
        if(index == items.length - 1){
          $rootScope.$broadcast('zoteroBibliography', output);
        }else{
          zoteroFetchingHandler(items, index + 1, output);
        }
      });
    }

    var fetchZoteroRefs = function(html){
      query
        .init(apiKey, userId);

      var match, i=0, itemsToFetch = [], r = /(?:items\/)(.*)/gi, m, item;
      while(match = matchZoteroUrl.exec(html)){
        i++;
        while(m = r.exec(match[1])){
          item = m[1];
        }

        html = html.replace(match[0], '<a ng-href="#zotero-ref-element-'+(i)+' "zotero-url="'+match[1]+'" du-smooth-scroll class="zotero-reference" id="zotero-ref-pointer-'+i+'">['+i+']</a>');
        itemsToFetch.push(item);
      }

      return {
        html : html,
        toFetch : itemsToFetch
      };
    }

    var updateMarkdown = function(text, callback, extractGSpread){
      var output = buildLibrary(text);
      output.toc = makeToc(text);
      output.title = extractTitle(text);
      output.html = markdownConverter.makeHtml(output.markdown);
      var zotero = fetchZoteroRefs(output.html);
      output.html = zotero.html;
      return callback(output, zotero.toFetch);
    }

    // Public API here
    return {
      process: function (text, callback, extractGSpread) {
        updateMarkdown(text, function(output, zoteroToFetch){
          extractSpreadsheets(text);//launching non-blocking spreadsheet fetching
          zoteroFetchingHandler(zoteroToFetch, 0, []);
          return callback(output);
        })

        
      }
    };
  });