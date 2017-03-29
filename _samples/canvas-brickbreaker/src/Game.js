require.config({
    baseUrl: 'src/components/'
});

define([
    'Background', 'Bricks'
], function(Background, Bricks) {
    return function() {

        var background = new Background();
        var bricks = new Bricks;

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
            },
            render: function() {
                background.render();
                bricks.render();
            }
        };
    };
});