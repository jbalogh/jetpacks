jetpack.future.import("pageMods");

jetpack.pageMods.add(function(doc){
  jQuery('<link rel="stylesheet" type="text/css" ' +
         'href="http://jbalogh.github.com/jetpacks/slipstream/helvetireader.css">',
         doc)
  .appendTo(doc.querySelector('head'));
},
['http://*.google.com/reader*']);
