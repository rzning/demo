window.addEventListener('load', function() {
    var inputNode = document.getElementById('babelcode');
    var outputNode = document.getElementById('jscode');
    var srcEditor = CodeMirror.fromTextArea(inputNode, {
        mode: 'text/babel',
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
        var str = sassEditor.getValue();
        var res = '';
        resEditor.setValue(res);
    });

}, false);
