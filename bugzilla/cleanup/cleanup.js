jetpack.future.import("pageMods");

jetpack.pageMods.add(function(doc) {
    var $doc = $(doc);
    $doc.find('#flags, .flags_label').remove();
    $doc.find('th[id^="field_label_cf"]').each(function(i, e) {
        $(e, doc).parent().remove();
    });
    // Remove the access keys!
    $doc.find('[accesskey]').each(function(i, e) {
        e.removeAttribute('accessKey');
    });
},
['https://bugzilla.mozilla.org/show_bug.cgi',
 'https://bugzilla.mozilla.org/post_bug.cgi',
]);
