var places = {
  preview: {scheme: 'https',
            host: 'preview.addons.mozilla.org',
            prefix: ''},
  amo:     {scheme: 'https',
            host: 'addons.mozilla.org',
            prefix: ''},
  khan:    {scheme: 'http',
            host: 'jbalogh.khan.mozilla.org',
            prefix: '/amo/site'}
};

var buttons = ['<button id="' + k + '">' + k[0].toUpperCase() + '</button>'
               for (k in places)];

jetpack.statusBar.append({
    html: '<div id="amo-switcher">' + buttons.join('') + '</div>',
    width: 81,
    onReady: function(doc) {
        $(doc).find('#amo-switcher').click(function(e) {
            var target = e.target.id,
                next = places[target],
                d = jetpack.tabs.focused.contentDocument,
                l = d.location;
            for (var k in places) {
                if (k != target &&
                    l.host.indexOf(places[k].host) != -1) {
                    var path = l.pathname.replace(places[k].prefix, '');
                    d.location = next.scheme + '://' + next.host + next.prefix + path;
                }
            }
        });
    }
});
