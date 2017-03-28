define(function() {
    return function() {
        return {
            init: function(opts) {
                this.width = opts.width;
                this.height = opts.height;
                this.color = '#123';
            },
            render: function(ctx) {
                ctx.fillStyle = this.color;
                ctx.fillRect(0, 0, this.width, this.height);
            }
        };
    };
});