require.config({
    baseUrl: 'src/components/'
});

define([
    'Background', 'Bricks', 'Ball'
], function(Background, Bricks, Ball) {
    return function() {

        var background = new Background();
        var bricks = new Bricks();
        var ball = new Ball();

        var ctx = null;

        return {
            setup: function(opts) {
                this.width = opts.width;
                this.heigth = opts.heigth;
                ctx = opts.context;
                this.init(opts);
                this.render();
            },
            init: function(opts) {
                background.init(opts);
                bricks.init(opts);
                ball.init(opts);
            },
            render: function() {
                background.render();
                bricks.render();
                ball.render();
            }
        };
    };
});