define(function() {
    return function() {

        /** 滑块中心位置 x */
        var x = 200;
        /** 滑块中心位置 y */
        var y = 200;
        /** 滑块长半径 */
        var a = 48;
        /** 滑块短半径 */
        var b = 12;
        /** 滑块圆弧半径 */
        var r = 9;
        /** 滑块移动速度 */
        var speed = 4;

        /** 游戏全局数据对象 */
        var G = null;
        /** 画布上下文 */
        var ctx = null;

        return {
            init: function(opts) {
                G = opts;
                ctx = opts.context;
            },
            move: function() {
                if(x>a && x<G.width-a) {
                    x += speed;
                }
            },
            /**
             *          8           1           2
             *      (x-a,y-b)     (x,y-b)   (x+a,y-b)
             *          +-----------+-----------+
             *          |           |           |   3
             *  (x-a,y) +        -(x,y)-        + (x+a,y)
             *      7   |           |           |
             *          +-----------+-----------+
             *      (x-a,y+b)     (x,y+b)   (x+a,y+b)
             *          6           5           4
             */
            render: function() {
                if(ctx) {
                    // 绘制内切弧线 arcTo( 顶点x, 顶点y, 终点x, 终点y, 圆弧半径 ) # 起点为画笔当前位置

                    ctx.beginPath();
                    ctx.moveTo(x, y-b); // 1
                    ctx.arcTo(x+a, y-b, x+a, y, r); // 2 3
                    ctx.arcTo(x+a, y+b, x, y+b, r); // 4 5
                    ctx.arcTo(x-a, y+b, x-a, y, r); // 6 7
                    ctx.arcTo(x-a, y-b, x, y-b, r); // 8 1
                    ctx.closePath();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#fff';
                    ctx.fillStyle = '#123';
                    ctx.stroke();
                    ctx.fill();
                }
            }
        };
    };
});