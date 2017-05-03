$(function() {
    // 创建 jsTree 实例
    $('#jstree').jstree();
    // 绑定事件
    $('#jstree').on('changed.jstree', function(e, data) {
        alert(data.selected);
    });
    
    $('button').on('click', function() {
        $('#jstree').jstree(true).select_node('child_node_1');
        $('#jstree').jstree('select_node', 'child_node_1');
        $.jstree.reference('#jstree').select_node('child_node_1');
    });


    // 示例二
    $('#jstree_demo').jstree({
    "core" : {
        "animation" : 0,
        "check_callback" : true,
        "themes" : { "stripes" : true },
        'data' : {
        'url' : function (node) {
            return node.id === '#' ?
            'ajax_demo_roots.json' : 'ajax_demo_children.json';
        },
        'data' : function (node) {
            return { 'id' : node.id };
        }
        }
    },
    "types" : {
        "#" : {
        "max_children" : 1,
        "max_depth" : 4,
        "valid_children" : ["root"]
        },
        "root" : {
        "icon" : null,
        "valid_children" : ["default"]
        },
        "default" : {
        "valid_children" : ["default","file"]
        },
        "file" : {
        "icon" : "glyphicon glyphicon-file",
        "valid_children" : []
        }
    },
    "plugins" : [
        "contextmenu", "dnd", "search",
        "state", "types", "wholerow"
    ]
    });
});

