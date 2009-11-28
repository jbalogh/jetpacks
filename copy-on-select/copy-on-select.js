// Copy on select is awesome.
jetpack.future.import("selection");
jetpack.future.import("clipboard");

jetpack.selection.onSelection(function(){
    jetpack.clipboard.set(jetpack.selection.text);
});
