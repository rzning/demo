define(function() {
    return function() {

        /** 球半径 */
        var r = 10;
        /** 圆心坐标 x */
        var x = 100;
        /** 圆心坐标 y */
        var y = 100;
        /** 移动增量 x */
        var x_delta = 2;
        /** 移动增量 y */
        var y_delta = 2;

        var ctx = null;

        return {
            init: function(opts) {
                ctx = opts.context;
            },
            render: function() {
                if(ctx) {
                    ctx.beginPath();
                    ctx.arc(x, y, r, 0, 2*Math.PI);
                    ctx.closePath();
                    ctx.fillStyle = '#cde';
                    ctx.fill();
                }
            }
        }
    };
});