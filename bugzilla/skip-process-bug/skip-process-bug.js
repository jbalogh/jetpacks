jetpack.tabs.onReady(function(doc){
  var root = 'https://bugzilla.mozilla.org/',
      pages = ['process_bug', 'attachment'],
      paths = pages.map(function(p) root + p + '.cgi');
  if (paths.some(function(p) doc.location == p)) {
    var $doc = $(doc),
        mail = $doc.find('#bugzilla-body > dl').text(),
        bug = $($doc.find('.bz_alias_short_desc_container > a'));
    jetpack.notifications.show({title: 'Mail sent for ' + bug.text(), body: mail});
    doc.location = root + bug.attr('href');
  }
});
