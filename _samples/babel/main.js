window.addEventListener('load', function() {
    var inputNode = document.getElementById('babelcode');
    var outputNode = document.getElementById('jscode');
    var srcEditor = CodeMirror.fromTextArea(inputNode, {
        mode: 'text/jsx',
        lineNumbers: true,
        indentUnit: 4,
        matchBrackets: true
    });
    var resEditor = CodeMirror.fromTextArea(outputNode, {
        mode: 'text/javascript',
        lineNumbers: true,
        readOnly: true
    });

    resEditor.setValue('/* babel demo */');

    srcEditor.on('change',function() {
        var str = srcEditor.getValue();
        var res = Babel.transform(str, {
            presets: ['es2015','es2016','react'],
            babelrc: false
        });
        resEditor.setValue(res.code);
    });

}, false);
