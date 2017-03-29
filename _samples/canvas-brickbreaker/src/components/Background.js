define(function() {
    return function() {
        var ctx = null;
        return {
            init: function(opts) {
                this.width = opts.width;
                this.height = opts.height;
                ctx = opts.context;
            },
            render: function() {
                if(ctx) {
                    var gradient = ctx.createLinearGradient(0, 0, this.width, this.height);
                    gradient.addColorStop(0, '#333');
                    gradient.addColorStop(0.5, '#246');
                    gradient.addColorStop(1, '#111');
                    ctx.fillStyle = gradient;
                    ctx.fillRect(0, 0, this.width, this.height);
                }
            }
        };
    };
});