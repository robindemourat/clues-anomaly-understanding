(function () {

  function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
  }

  var table = function (converter) {

    var tables = {}, style = 'text-align:left;', filter;
    tables.th = function (header) {
      if (header.trim() === "") {
        return "";
      }
      var id = header.trim().replace(/ /g, '_').toLowerCase();
      return '<th id="' + id + '" style="' + style + '">' + header + '</th>';
    };
    tables.td = function (cell) {
      return cell.trim().replace(/'/g, "’").replace(/"/g, "’’");
      ///*'<td style="' + style + '">' +*/ converter.makeHtml(cell) /*+ '</td>'*/;
    };
    tables.ths = function () {
      var out = "", i = 0, hs = [].slice.apply(arguments);
      for (i; i < hs.length; i += 1) {
        out += tables.th(hs[i]) + '\n';
      }
      return out;
    };
    tables.tds = function () {
      var out = [], i = 0, ds = [].slice.apply(arguments);
      for (i; i < ds.length; i += 1) {
        out.push(tables.td(ds[i]));
      }
      return out;
    };
    tables.thead = function () {
      var out, i = 0, hs = [].slice.apply(arguments);
     // out = "<thead>\n";
     // out += "<tr>\n";
      //out += tables.ths.apply(this, hs);
     // out += "</tr>\n";
      //out += "</thead>\n";
      return out;
    };
    tables.tr = function () {
      var i = 0, cs = [].slice.apply(arguments);
      //out = "<tr>\n";
      //out += "</tr>\n";
      return (tables.tds.apply(this, cs));
    };

    filter = function (text) {
      //var i = 0, lines = text.split('\n'), line, hs, rows, out = [];
      var i = 0, lines = text.split('\n'), line, hs, rows = [], out = [], vals, obj;
      for (i; i < lines.length; i += 1) {
        line = lines[i];
        // looks like a table heading
        if (line.trim().match(/^[|]{1}.*[|]{1}$/)) {
          var data = [];
          line = line.trim();
          hs = line.substring(1, line.length - 1).split('|');
          //console.log(hs);
          for(var n in hs)hs[n] = hs[n].trim();

          line = lines[++i];
          if (!line.trim().match(/^[|]{1}[-=|: ]+[|]{1}$/)) {
            // not a table rolling back
            line = lines[--i];
          } else {
            line = lines[++i];
            
            while (line.trim().match(/^[|]{1}.*[|]{1}$/)) {
              line = line.trim();
              vals = (tables.tr.apply(this, line.substring(1, line.length - 1).split('|')));
              obj = {};
              for(var n in hs){
                obj[hs[n]] = vals[n];
              }
              data.push(obj);
              line = lines[++i];
            }

            var grid = {
              data : data,
              enableColumnResize : true,
              paginationPageSizes: [25, 50, 100],
              paginationPageSize: 25,
              useExternalPagination: true,
              useExternalSorting: true,
              enableGridMenu: true,
            }
            var output =  "<div ui-grid='"+JSON.stringify(grid)+"' class='grid'></div>";
            out.push(output);
            continue;
          }
        }
        out.push(line);
      }
      
      
      return out.join('\n');
    };
    return [
      {
        type:   'lang',
        filter: filter
      }
    ];
  };

  // Client-side export
  if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) {
    window.Showdown.extensions.grid = table;
  }
  // Server-side export
  if (typeof module !== 'undefined') {
    module.exports = table;
  }
}());