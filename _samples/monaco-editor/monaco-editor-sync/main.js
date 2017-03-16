var container = document.getElementById('container');
var editor = monaco.editor.create(container, {
    value: [
        'function func() {',
        '\tconsole.log("Hello Monaco Editor");',
        '}'
    ].join('\n'),
    language: 'javascript'
});
window.addEventListener('resize', function() {
    editor.layout();
},false);