'use strict';

(function() {
  var modulohref = function(converter) {
    return [
      { type: 'lang',
        regex : '\\[([^\\]]*)\\]\\(\\^\\^modulo-href:([^\\)]*)\\)',
        replace : '<span class="modulo-href-trigger animate" ng-click="setAside(\''+'$2'+'\')"  ng-class="{\'active\' : asideData.title == \''+'$2'+'\'}"  id="'+'$2'+'">'+'$1'+'</span>'
      }
    ];
  }

  // Client-side export
  if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.modulohref = modulohref; }
  // Server-side export
  if (typeof module !== 'undefined') module.exports = modulohref;
})();
