jetpack.future.import("pageMods");

jetpack.pageMods.add(function(doc){
  jQuery('<link rel="stylesheet" type="text/css" ' +
          'href="http://www.helvetireader.com/css/helvetireader.css">')
  .appendTo(doc.querySelector('head'));
},
['http://*.google.com/reader*']);
