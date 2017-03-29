define(function() {
    return function() {

        function Tab(row, col) {
            var tab = new Array();
            for(var i=0;i<row;i++) {
                tab[i] = new Array();
                for(var j=0;j<col;j++) {
                    tab[i][j] = true;
                }
            }

            // 重写 forEach() 方法
            tab.forEach = function(callback, context) {
                for(var i=0;i<tab.length;i++) {
                    for(var j=0;j<tab[i].length;j++) {
                        callback.call((context || tab), tab[i][j], i, j, tab);
                    }
                }
            };

            return tab;
        }

        /** 砖块间隙宽度 */
        var gap = 2;
        /** 砖块层数 */
        var row = 3;
        /** 每层砖块个数 */
        var col = 5;
        /** 砖块宽度 */
        var w = 30;
        /** 砖块高度 */
        var h = 16;
        /** 砖块集合 */
        var tab = null;

        var ctx = null;

        return {
            init: function(opts) {
                ctx = opts.context;
                var width = opts.width;
                w = (width/col)-gap;
                tab = new Tab(row, col);
            },
            gradient: function(ctx,x,y,w,h) {
                var grad = ctx.createLinearGradient(x,y,x+w,y+h);
                var hue = Math.round(Math.random()*360);
                grad.addColorStop(0, 'hsl('+hue+',80%,60%)');
                grad.addColorStop(1, 'hsl('+hue+',60%,28%)');
                return grad;
            },
            render: function() {
                if(ctx) {
                    tab.forEach(function(item, row, col) {
                        if(item) {
                            var x = col*(w+gap);
                            var y = row*(h+gap);
                            ctx.fillStyle = this.gradient(ctx,x,y,w,h);
                            ctx.fillRect(x, y, w, h);
                        }
                    }, this);
                }
            }
        };
    };
});