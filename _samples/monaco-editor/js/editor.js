require.config({
    paths: {
        'vs': 'https://microsoft.github.io/monaco-editor/node_modules/monaco-editor/min/vs'
    }
});

// 使用代理实现 Web Worker 跨域请求。 <https://www.w3.org/TR/workers/>
window.MonacoEnvironment = {
    getWorkerUrl: function(workerId, label) {
        return 'js/monaco-editor-worker-loader-proxy.js';
    }
}

require(['vs/editor/editor.main'], function() {
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
});