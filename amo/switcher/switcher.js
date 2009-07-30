jetpack.future.import('pageMods');

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

for each (var o in places) {
    o.url = o.scheme + '://' + o.host + o.prefix;
}

jetpack.pageMods.add(function(doc) {
    var match = [v for each (v in places)
                 if (doc.location.host.indexOf(v.host) != -1)][0],
        path = doc.location.pathname.replace(match.prefix, ''),
        links = [];

    for (var [k,o] in Iterator(places)) {
        if (o != match) {
            var href = o.url + path + doc.location.hash;
            links.push('<li><a href="' + href + '">' + k + '</a></li>');
        }
    }

    $(doc).find('head').append(style.toXMLString());
    $(doc.body).append('<ul id="jetpack-amo-switcher">' + links.join('') + '</ul>');
},
[o.url + '/*' for each (o in places)]);

var style = <>
<style type="text/css"><![CDATA[
  #jetpack-amo-switcher {
    -moz-border-radius: 8px;
    -moz-border-radius-topleft: 0px;
    border: 1px solid #aaa;
    padding: 6px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9000;
    background-color: #eee;
    opacity: .9;
  }
  #jetpack-amo-switcher a {
    text-shadow: 0 1px 0 #999;
    color: #0055EE;
  }
]]></style>
</>;
