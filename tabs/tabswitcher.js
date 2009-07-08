/* Local place for sharing code. */
var self = {};

jetpack.tabs.onReady(function(doc){

  var $doc = $(doc); // jQuery-alized document object.

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
     * self.rm is defined when the overlay is created.
     */
    var show = function(title) {
      tabs[title].focus();
      self.rm();
    };

    /* Do a tab switch when clicking on a result link.
     * The href looks like "tab://<tab name>".
     */
    $doc.find('#results ul').click(function(e){
        e.preventDefault();
        show(decodeURI(e.target.href.substring(6)));
    });

    /* Grab the href from the first result link
     * if enter is pressed in the input.
     */
    $doc.find('#cmdinput').keypress(function(e){
        if (e.keyCode == 13) { /* Enter */
          show($doc.find('#results li:first-child a')
                .attr('href').substring(6));
        }
    });

    /* Remove the overlay if ESC or C-t (the magic key) is hit. */
    $doc.keypress(function(e){
        if (e.keyCode == 27 /* Esc */ ||
            e.ctrlKey && e.charCode == 116) {
          self.rm();
        }
    });

    /* Once everything is setup, inject tab data into the overlay. */
    $doc.find('#tabs').html(JSON.stringify(titles));
  }

  /* Catching this keypress would be way better in chrome.  Right now this won't
   * work if the document isn't focused (as happens with tab.focus()).
   */
  $doc.keypress(function(e){
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

      var body = doc.body;
      body.appendChild(iframe);

      /* Set up a function so the overlay can be removed in other scopes. */
      self.rm = function(){
        body.removeChild(iframe);
        body.focus();
      }

      /* Remove the overlay if there's a click outside. */
      $(body).click(function() {
        $(this).unbind('click', arguments.callee);
        self.rm();
      });
    }
  })
});
