jetpack.future.import('pageMods');

jetpack.pageMods.add(function(doc) {
  $(doc).find('#browser-message-unknown').remove();
},
['https://*.mint.com/*']);
