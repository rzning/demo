define(function() {
    return function() {
        var ctx = null;
        return {
            init: function(opts) {
                ctx = opts.context;
            },
            render: function() {
                if(ctx) {
                    //...
                }
            }
        };
    };
});