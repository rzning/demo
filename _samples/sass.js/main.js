window.addEventListener('load', function() {
    var sassNode = document.getElementById('sasscode');
    var cssNode = document.getElementById('csscode');
    var sassEditor = CodeMirror.fromTextArea(sassNode, {
        mode: 'text/x-scss',
        lineNumbers: true,
        indentUnit: 4,
        matchBrackets: true
    });
    var cssEditor = CodeMirror.fromTextArea(cssNode, {
        mode: 'text/css',
        lineNumbers: true,
        readOnly: true
    });

    cssEditor.setValue('/* sass.js demo */');

    console.dir(sassEditor);

    sassEditor.on('change',function() {
        var str = sassEditor.getValue();
        var res = '';
        Sass.compile(str, function(result) {

            switch(result.status) {
                case 0: {
                    res = result.text || '/*空*/';
                    break;
                }
                case 1:{
                    //res = '/*\n'+result.formatted+'*/';
                    res = result.formatted;
                }
            }
            cssEditor.setValue(res);
        });
    });

}, false);
