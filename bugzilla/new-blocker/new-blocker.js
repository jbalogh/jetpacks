jetpack.future.import('pageMods');

ROOT = 'https://bugzilla.mozilla.org/enter_bug.cgi';

var queryString = function(pairs){
  /* Turn an object into a query string like "k1=v1&k2=v2" */
  return [(k + '=' + v) for ([k, v] in Iterator(pairs))].join('&');
}

jetpack.pageMods.add(function(document){
  var q = function(e) document.querySelector(e),
      qs = {product: q('#product').value,
            component: q('#component').value,
            blocked: q('[name=id]').value},
      url = ROOT + '?' + queryString(qs);
  $('<a href="' + url + '">Create new dependency</a>')
      .appendTo(q('#dependson_input_area').parentNode);
},
['https://bugzilla.mozilla.org/*']);
