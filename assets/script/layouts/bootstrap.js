window.addEventListener('load', function() {

    var url_prefix = 'v4/';

    function getContent(url, callback) {
        $.ajax({
            url: url,
            type: "GET",
            dataType: "text",
            success: callback
        });
    }

    // 点击目录列表项回调
    $('[role="nav-item"]').on('click', function(e) {
        var node = e.currentTarget;
        // 加载描述信息
        var url = url_prefix + node.dataset.url + 'index.md';
        getContent(url, function(data) {
            $('#des').html(marked(data));
        });
    });
}, false);