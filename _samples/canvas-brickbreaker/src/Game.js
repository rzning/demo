require.config({
    baseUrl: 'src/components/'
});

define([
    'Background'
], function(Background) {
    return function() {

        var background = new Background();

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
            },
            render: function() {
                background.render();
            }
        };
    };
});