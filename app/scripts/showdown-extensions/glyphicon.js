(function() {
  var a = function(a) {
    return [{
      type: "lang",
      regex: "\\B(\\\\)?@glyphicon-([\\S]+)\\b",
      replace: function(a, b, c) {
        return b === "\\" ? a : '<span class="glyphicon glyphicon-' + c + '">' + "</span>"
      }
    }, {
      type: "lang",
      regex: "\\B(\\\\)?@fa-([\\S]+)\\b",
      replace: function(a, b, c) {
        return b === "\\" ? a : '<i class="fa fa-' + c + '">' + "</i>"
      }
    }]
  };
  typeof window != "undefined" && window.Showdown && window.Showdown.extensions && (window.Showdown.extensions.glyphicon = a), typeof module != "undefined" && (module.exports = a)
})();
