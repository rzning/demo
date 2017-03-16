"use strict";
window.addEventListener('load', function() {

    // 编辑器对象
    var editor = null;

    // 异步获取代码样例
    function xhr(url, callback) {
        var req = new XMLHttpRequest();
        req.addEventListener('readystatechange', function() {
            if(req._canceled) {
                return;
            }
            if(req.readyState === 4) {
                if(req.status>=200 && req.status<300) {
                    callback(req.responseText, false);
                }
                else {
                    callback(null, true);
                }
            }
        }, false);
        req.open('GET', url, true);
        req.send(null);
    }

    /**
     * 加载代码样例
     * @param {Object} mode 代码语言选配对象
     */
    function loadSample(mode) {
        xhr(mode.sampleURL, function(data, err) {
            var editorContainer = document.getElementById('colorize-editor');

            // 获取代码样例失败处理
            if(err) {
                if(editor) {
                    var model = editor.getModel();
                    if(model) {
                        model.dispose();
                    }
                    editor.dispose();
                    editor = null;
                }
                editorContainer.innerHTML = "";
                editorContainer.innerHTML = '<p class="alert alert-error">'+
                    'Failed to load <strong>'+ mode.modeId +'</strong> sample.</p>';
                return;
            }

            // 若不存在 editor 则创建
            if(!editor) {
                editorContainer.innerHTML = "";
                editor = monaco.editor.create(editorContainer, {
                    model: null
                });
            }

            // 创建 model 并渲染到 editor
            var oldModel = editor.getModel();
            var newModel = monaco.editor.createModel(data, mode.modeId);
            editor.setModel(newModel);
            if(oldModel) {
                oldModel.dispose();
            }
        });
    }

    function changeTheme(theme) {
        var newTheme = theme==0?'vs':(theme==1?'vs-dark':'hc-black');
        if(editor) {
            editor.updateOptions({
                theme: newTheme
            });
        }
    }

    require(['vs/editor/editor.main'], function() {
        // 获取语言列表
        var modes = (function() {
            var modesIds = monaco.languages.getLanguages().map(function(lang) {
                return lang.id;
            });
            modesIds.sort();

            return modesIds.map(function(modeId) {
                return {
                    modeId: modeId,
                    sampleURL: 'snippets/sample.'+modeId+'.txt'
                };
            });
        })();

        // 配置语言下拉菜单
        var startModeIndex = 0;
        var langPicker = document.getElementsByClassName('language-picker')[0];
        for(var i=0;i<modes.length;i++) {
            var name = modes[i].modeId;
            var opt = document.createElement('option');
            opt.textContent = name;
            if(name == "javascript") {
                startModeIndex = i;
            }
            langPicker.appendChild(opt);
        }
        langPicker.selectedIndex = startModeIndex;

        // 加载语言样例
        loadSample(modes[startModeIndex]);

        // 切换语言处理
        langPicker.addEventListener('change', function(e) {
            var node = e.currentTarget;
            loadSample(modes[node.selectedIndex]);
        }, false);

        // 切换主题处理
        var themePicker = document.getElementsByClassName('theme-picker')[0];
        themePicker.addEventListener('change', function() {
            changeTheme(themePicker.selectedIndex);
        }, false);

    });

    // 窗口大小改变回调
    window.addEventListener('resize', function() {
        if(editor) {
            editor.layout();
        }
    }, false);
}, false);