require.config({
    baseUrl: 'src/components/'
});

define([
    'Background', 'Bricks', 'Ball', 'Slider', 'Control'
], function(Background, Bricks, Ball, Slider, Control) {
    return function() {

        var background = new Background();
        var bricks = new Bricks();
        var ball = new Ball();
        var slider = new Slider();
        var components = [
            background, bricks, ball, slider
        ];
        var control = new Control();

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
                // background.init(opts);
                // bricks.init(opts);
                // ball.init(opts);
                // slider.init(opts);
                components.forEach(function(comp) {
                    comp.init(opts);
                });
                control.init();
            },
            render: function() {
                // background.render();
                // bricks.render();
                // ball.render();
                // slider.render();
                components.forEach(function(comp) {
                    comp.render();
                });
            }
        };
    };
});