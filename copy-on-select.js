// Copy-on-select is awesome.

// Thanks zpao!
// The clipboard isn't implemented in Jet Pack yet, so use the service.
const gClipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].
                         getService(Components.interfaces.nsIClipboardHelper);

jetpack.tabs.onReady(function(doc){
    $(doc).find('body').mouseup(function(){
        var s = new String(doc.getSelection());
        if (s.length) {
            gClipboardHelper.copyString(s);
        }
    });
});
