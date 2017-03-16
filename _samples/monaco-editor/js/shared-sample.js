require(['vs/editor/editor.main'], function() {
    var model = monaco.editor.createModel([
            'var model = monaco.editor.createModel([',
            '\t\t"function x() {",',
            '\t\t"\\tconsole.log(\'Hello Monaco Editor\');",',
            '\t\t"}"',
            '\t].join("\\n"),',
            '\t"javascript"',
            ');'
        ].join('\n'),
        'javascript'
    );
    var container1 = document.getElementById('share-container1');
    var container2 = document.getElementById('share-container2');
    var editor1 = monaco.editor.create(container1, {
        model: model
    });
    var editor2 = monaco.editor.create(container2, {
        model: model
    });

    window.addEventListener('resize', function() {
        [ editor1, editor2
        ].forEach(function(editor) {
            editor.layout();
        });
    }, false);

});
