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

    function getDescription(url) {
        getContent(url, function(data) {
            $('#des').html(marked(data));
        });
    }

    function getExample(url) {
        getContent(url, function(data) {
            $('#src').html(data);
        });
    }


    // 点击目录列表项回调
    $('[role="nav-item"]').on('click', function(e) {
        var node = e.currentTarget;
        var baseUrl = url_prefix + node.dataset.url
        // 加载描述信息
        var url =  baseUrl + 'index.md';
        getDescription(url);
        getExample(baseUrl+'ex1.html');
    });
}, false);