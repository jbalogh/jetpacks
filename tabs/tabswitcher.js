var self = {};

jetpack.tabs.onReady(function(doc){

  if (doc.title == 'tabs') {
    var titles = [], tabs = {};
    jetpack.tabs.forEach(function(tab) {
        var title = tab.contentDocument.title;
        tabs[title] = tab;
        titles.push(title);
    });

    $(doc).find('#results ul').click(function(e){
        e.preventDefault();
        var title = decodeURI(e.target.href.substring(6));
        tabs[title].focus();
        self.rm();
    });

    $(doc).find('#tabs').html(JSON.stringify(titles));
  }
  $(doc).keypress(function(e){
    // C-t, only nice on macs.
    if (e.ctrlKey && e.charCode == 116) {
      var iframe = doc.createElement('iframe');
      iframe.src = 'data:text/html,' + html;

      iframe.style.position = 'fixed';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.height = '540px';
      iframe.style.width = '800px';
      iframe.style.border = 'none';
      iframe.style.overflow = 'hidden';

      doc.body.appendChild(iframe);
      self.rm = function(){ doc.body.removeChild(iframe); }
    }
  })
});
