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
});