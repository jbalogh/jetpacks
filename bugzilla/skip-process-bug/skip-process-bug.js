jetpack.tabs.onReady(function(doc){
  var root = 'https://bugzilla.mozilla.org/',
      pages = ['attachment', 'post_bug', 'process_bug'],
      paths = pages.map(function(p) root + p + '.cgi'),
      collision = 'Mid-air collision!';
  if (paths.some(function(p) doc.location == p) && doc.title != collision) {
    var $doc = $(doc),
        mail = $doc.find('#bugzilla-body > dl').text(),
        bug = $($doc.find('.bz_alias_short_desc_container > a'));
    /* Bail if we sense a disturbance. */
    if (bug.size() != 0) {
      jetpack.notifications.show({title: 'Mail sent for ' + bug.text(), body: mail});
      doc.location = root + bug.attr('href');
    }
  }
});
