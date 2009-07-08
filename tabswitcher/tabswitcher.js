/* View the source at http://github.com/jbalogh/jetpacks/tree/gh-pages/tabswitcher
 * to see the uncompressed overlay.
 */

var self = {
  _rm: [], /* List of overlays to be deleted. */
};

var setup = function(doc) {

  var $doc = $(doc); // jQuery-alized document object.

  /* Delete all the overlays and clear the array. */
  var clear_overlays = function() {
    self._rm.forEach(function(e) {
      var parent = e.parentNode;
      parent.removeChild(e);
      parent.focus();
    });
    self._rm.splice(0, self._rm.length);
  };

  /* Do special things if we're looking at the overlay. */
  if (doc.title == 'Tab Switcher Overlay (secret code: asefiugi235urg)') {

    /* The array of titles is passed to the overlay, the mapping finds the tab
     * we want.
     */
    var titles = [], tabs = {};
    jetpack.tabs.forEach(function(tab) {
        var title = tab.contentDocument.title;
        tabs[title] = tab;
        titles.push(title);
    });

    /* Focus on the tab by name and remove the overlay.
     */
    var show = function(title) {
      tabs[title].focus();
      clear_overlays();
    };

    /* Do a tab switch when clicking on a result link.
     * The href looks like "tab://<tab name>".
     */
    $doc.find('#results ul').click(function(e) {
        e.preventDefault();
        show(decodeURI(e.target.href.substring(6)));
    });

    /* Grab the href from the first result link
     * if enter is pressed in the input.
     */
    $doc.find('#cmdinput').keypress(function(e) {
        if (e.keyCode == 13) { /* Enter */
          show($doc.find('#results li:first-child a')
                .attr('href').substring(6));
        }
    });

    /* Remove the overlay if ESC or C-t (the magic key) is hit. */
    $doc.keypress(function(e) {
        if (e.keyCode == 27 /* Esc */ ||
            e.ctrlKey && e.charCode == 116) {
          clear_overlays();
        }
    });

    /* Once everything is setup, inject tab data into the overlay. */
    $doc.find('#tabs').html(JSON.stringify(titles));
  }

  /* Catching this keypress would be way better in chrome.  Right now this won't
   * work if the document isn't focused (as happens with tab.focus()).
   */
  $doc.keypress(function(e) {
    /* Magic key: C-t. Probably only nice on macs. */
    if (e.ctrlKey && e.charCode == 116) {
      /* Drop the overlay in an iframe.  `html` is a string containing a full
       * HTML document, added by the build script.
       */
      var iframe = doc.createElement('iframe');
      iframe.src = 'data:text/html,' + html;
      $(iframe).css({
        position: 'fixed',
        top: 0,
        left: 0,
        height: '540px',
        width: '800px',
        border: 'none',
        overflow: 'hidden',
        'z-index': 9999,
      });

      doc.body.appendChild(iframe);
      self._rm.push(iframe);

      /* Remove the overlay if there's a click outside. */
      $(doc.body).click(function() {
        $(this).unbind('click', arguments.callee);
        clear_overlays();
      });
    }
  });
};

/* Bind the onready handler, get any existing tabs as well. */
jetpack.tabs.onReady(setup);
jetpack.tabs.forEach(function(tab){ setup.call(tab, tab.contentDocument); });

var html = '<!DOCTYPE html>\n<!-- All comments must be multiline, this page is smooshed into a data URL. -->\n<html>\n  <head>\n    <meta http-equiv="Content-type" content="text/html; charset=utf-8">\n    <!-- Secret code for uniqueness and mystery, matched on jetpack side. -->\n    <title>Tab Switcher Overlay (secret code: asefiugi235urg)</title>\n    <style type="text/css" media="screen">\n      /* Hot styling inspired by "Ubiquity Evolved" theme from Stephen Horlander\n       * and Aza Raskin.\n       */\n      div, input, ul, li { margin: 0; padding: 0; }\n      body { font-size: 16px; }\n      #overlay {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 50em;\n      }\n      /* Inner border around the whole overlay. */\n      #cmdline, #results {\n        border: 1px solid #7e7e7e;\n      }\n      /* Command line up top. */\n      #cmdline, #cmdinput {\n        background-color: #9e9e9e;\n      }\n      /* Round the top corners so the whole overlay has a rounded look. */\n      #cmdline {\n        -moz-border-radius-topleft: 1em;\n        -moz-border-radius-topright: 1em;\n        border-bottom: 1px solid #000;\n      }\n      /* The text input. */\n      #cmdinput {\n        font-family: Geneva, Tahoma, Verdana;\n        font-size: 1.6em;\n        text-shadow: #afafaf 0px 1px .2px;\n        border: none;\n        margin: 0.3em;\n        width: 99%; /* Leave some room for rounding. */\n      }\n      /* The listing of matches. Round the bottom to finish the rounded overlay. */\n      #results {\n        background-color: #2b2b2b;\n        border-top: none;\n        min-height: 29em;\n        padding-bottom: 1em;\n        -moz-border-radius-bottomleft: 1em;\n        -moz-border-radius-bottomright: 1em;\n      }\n      /* Show each result link as block so there\'s a big click area. */\n      #results a {\n        display: block;\n        background-color: #808080;\n        color: #000;\n        border: 1px solid #a2a2a2;\n        border-right: 1px solid #525252;\n        border-bottom: 1px solid #525252;\n        font-size: 1.1em;\n        text-shadow: #afafaf 0px 1px .2px;\n        text-decoration: none;\n        padding: 1em;\n      }\n      /* Give the focused result link some color standout. */\n      #results a:focus {\n        font-weight: bold;\n        background-color: #c0c0c0;\n      }\n      /* Change the shape of the first child and focused link.  Including the\n       * first child to hint that it\'s the default choice.\n       */\n      #results li:first-child a, #results a:focus {\n        border: none;\n        -moz-box-shadow: 0 0 0.3em inset;\n        -moz-border-radius: 0.4em;\n      }\n      /* Just for shuttling messages between this page and jetpack. */\n      #tabs { display: none; }\n    </style>\n  </head>\n  <body>\n    <div id="overlay">\n      <div id="cmdline">\n        <input id="cmdinput" type="text">\n      </div>\n      <div id="results">\n        <ul></ul>\n      </div>\n    </div>\n    <span id="tabs"></span>\n    <script type="text/javascript">\n      /* Jetpack code drops data in #tabs.  When that happens we extract the\n       * data and put it in a local variable, then rank the input.\n       */\n      var tabs = [];\n      var t = document.querySelector(\'#tabs\');\n      t.addEventListener(\'DOMNodeInserted\',\n                         function(){ tabs = JSON.parse(t.innerHTML); onkeyup(); },\n                         false);\n\n      /* Cache some elements. */\n      var e = document.querySelector(\'#cmdinput\'),\n          results = document.querySelector(\'#results ul\');\n\n      /* Rank and sort tab names, update the results list. */\n      var onkeyup = function(){\n        var val = e.value;\n        /*\n         * DSU: rank all the tab names with the current input string, filter out\n         * the non-matching (score=0) and bad matches (<0.5), sort and reverse\n         * so they\'re ordered descending, then turn it into a list of links.\n         * Oh yeah. One (extended) line.\n        */\n        ts = tabs.map(function(name) [LiquidMetal.score(name, val), name]).\n            filter(function(a) a[0] > 0.5).sort().reverse().\n            map(function(a) {\n                var e = a[1];\n                return \'<li><a href="tab://\' + e + \'">\' + e + \'</a></li>\';\n            });\n        results.innerHTML = ts.join(\'\');\n      };\n\n      e.addEventListener(\'keyup\', onkeyup, false);\n      e.focus();\n    </script>\n    <script type="text/javascript">\n    /* Inlining the lib is easier than figuring out how to get jetpack to\n     * include it.  We want it always local so it\'s super fast.\n     */\n/*\n * LiquidMetal, version: 0.1 (2009-02-05)\n *\n * A mimetic poly-alloy of Quicksilver\'s scoring algorithm, essentially\n * LiquidMetal.\n *\n * For usage and examples, visit:\n * http://github.com/rmm5t/liquidmetal\n *\n * Licensed under the MIT:\n * http://www.opensource.org/licenses/mit-license.php\n *\n * Copyright (c) 2009, Ryan McGeary (ryanonjavascript -[at]- mcgeary [*dot*] org)\n */\nvar LiquidMetal = function() {\n  var SCORE_NO_MATCH = 0.0;\n  var SCORE_MATCH = 1.0;\n  var SCORE_TRAILING = 0.8;\n  var SCORE_TRAILING_BUT_STARTED = 0.9;\n  var SCORE_BUFFER = 0.85;\n\n  return {\n    score: function(string, abbreviation) {\n      /* Short circuits */\n      if (abbreviation.length == 0) return SCORE_TRAILING;\n      if (abbreviation.length > string.length) return SCORE_NO_MATCH;\n\n      var scores = this.buildScoreArray(string, abbreviation);\n\n      var sum = 0.0;\n      for (var i in scores) {\n        sum += scores[i];\n      }\n\n      return (sum / scores.length);\n    },\n\n    buildScoreArray: function(string, abbreviation) {\n      var scores = new Array(string.length);\n      var lower = string.toLowerCase();\n      var chars = abbreviation.toLowerCase().split("");\n\n      var lastIndex = -1;\n      var started = false;\n      for (var i in chars) {\n        var c = chars[i];\n        var index = lower.indexOf(c, lastIndex+1);\n        if (index < 0) return fillArray(scores, SCORE_NO_MATCH);\n        if (index == 0) started = true;\n\n        if (isNewWord(string, index)) {\n          scores[index-1] = 1;\n          fillArray(scores, SCORE_BUFFER, lastIndex+1, index-1);\n        }\n        else if (isUpperCase(string, index)) {\n          fillArray(scores, SCORE_BUFFER, lastIndex+1, index);\n        }\n        else {\n          fillArray(scores, SCORE_NO_MATCH, lastIndex+1, index);\n        }\n\n        scores[index] = SCORE_MATCH;\n        lastIndex = index;\n      }\n\n      var trailingScore = started ? SCORE_TRAILING_BUT_STARTED : SCORE_TRAILING;\n      fillArray(scores, trailingScore, lastIndex+1);\n      return scores;\n    }\n  };\n\n  function isUpperCase(string, index) {\n    var c = string.charAt(index);\n    return ("A" <= c && c <= "Z");\n  }\n\n   function isNewWord(string, index) {\n    var c = string.charAt(index-1);\n    return (c == " " || c == "\\t");\n  }\n\n  function fillArray(array, value, from, to) {\n    from = Math.max(from || 0, 0);\n    to = Math.min(to || array.length, array.length);\n    for (var i = from; i < to; i++) { array[i] = value; }\n    return array;\n  }\n}();\n    </script>\n  </body>\n</html>\n';
