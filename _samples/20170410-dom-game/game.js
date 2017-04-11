window.addEventListener('load', ()=>{

    /**
     * 简单关卡平面图
     * 
     * ```
     * -------------------- 静态元素
     *  ` `  空格表示空气
     *  `x`  墙壁
     *  `!`  静止的熔岩
     * -------------------- 动态元素
     *  `o`  硬币
     *  `@`  玩家起始位置
     *  `=`  水平移动的熔岩
     *  `|`  垂直移动的熔岩
     *  `v`  坠落的熔岩块
     * ```
     * 
     * 静态元素作为游戏背景，而动态元素浮动在背景之上。
     */
    var simpleLevelPlan = [
        '                    ',
        '                    ',
        ' x              = x ',
        ' x       o o      x ',
        ' x @     xxxxx    x ',
        ' xxxxx            x ',
        '     x!!!!!!!!!!!!x ',
        '     xxxxxxxxxxxxxx '
    ];

    /**
     * 活动元素类映射
     */
    var actorsMap = {
        '@': Player,
        'o': Coin,
        '=': Lava,
        '|': Lava,
        'v': Lava
    }


    /**
     * 关卡类
     */
    function Level(plan) {
        var width = plan[0].length;
        var height = plan.length;
        var grid = [];
        var actors = [];
        var player = null;

        for(var y=0;y<height;y++) {
            var line = plan[y], gridLine = [];
            for(var x=0;x<width;x++) {
                var item = line[x], itemType = null;
                // var actor = actorChars[ch];
                switch(item) {
                    case 'x': itemType = 'wall'; break;
                    case '!': itemType = 'lava'; break;
                    default: {
                        var Actor = actorsMap[item];
                        if(Actor) {
                            actors.push(new Actor(new Vector(x,y), item));
                        }
                    }
                }
                gridLine.push(itemType);
            }
            grid.push(gridLine);
        }

        player = actors.filter((actor)=>{
            return actor.type == 'player';
        })[0];

        return {
            /** 地图宽度 */
            width: width,
            /** 地图高度 */
            height: height,
            /** 地图背景网格 */
            grid: grid,
            /** 动态元素集合 */
            actors: actors,
            /** 玩家元素 */
            player: player,
            /** 关卡状态 */
            status: null,
            finishDelay: null,

            /** 判断关卡是否结束 */
            isFinished: function() {
                return this.status != null && this.finishDelay < 0;
            }
        };
    }

    /**
     * 矢量类：用于保存活动元素的位置和尺寸
     */
    function Vector(cx, cy) {
        var x = cx, y= cy;
        return {
            get x() {
                return x;
            },
            get y() {
                return y;
            },
            /** 叠加 */
            plus: function(other) {
                return new Vector(x+other.x, y+other.y);
            },
            /** 缩放 */
            scale: function(factor) {
                return new Vector(x*factor, y*factor);
            }
        }
    }

    /**
     * 活动元素 - 玩家类
     */
    function Player(pos) {
        return {
            /** 类型 */
            type: 'player',
            /** 位置 */
            pos: pos.plus(new Vector(0, -0.5)),
            /** 大小 */
            size: new Vector(0.8, 1.5),
            /** 速度 */
            speed: new Vector(0, 0)
        }
    }
    /**
     * 活动元素 - 岩浆类
     */
    function Lava(pos, char) {
        var speed = null;
        switch(char) {
            case '=': speed = new Vector(2, 0); break;
            case '|': speed = new Vector(0, 2); break;
            case 'V': speed = new Vector(0, 3); break;
        }
        return {
            /** 类型 */
            type: 'lava',
            /** 位置 */
            pos: pos,
            /** 大小 */
            size: new Vector(1, 1),
            /** 速度 */
            speed: speed
        }
    }
    /**
     * 活动元素 - 钱币类
     */
    function Coin(pos) {
        var pos = pos.plus(new Vector(0.2, 0.1));
        return {
            /** 类型 */
            type: 'coin',
            /** 基本位置 */
            basePos: pos,
            /** 位置 */
            pos: pos,
            /** 大小 */
            size: new Vector(0.6, 0.6),
            /** 跳动幅度 */
            wobble: Math.random()*Math.PI*2
        }
    }

    /**
     * 工具函数 - 创建 DOM 节点
     * 
     * 创建指定 class 属性的 DOM 元素对象
     */
    function elemc(name, cls) {
         var el = document.createElement(name);
         if(cls) el.className = cls;
         return el;
    }

    /**
     * 渲染器 - DOM 渲染类
     * @param {Object} level 游戏关卡对象
     * @param {HTMLElement} root 渲染父容器 DOM 节点对象
     */
    function DOMRender(level, root) {
        var wrap = root.appendChild(elemc('div', 'game'));
        var pixel = 20;

        function drawBackground() {
            var table = elemc('table', 'background');
            table.style.width = level.width * pixel + 'px';
            level.grid.forEach((line)=>{
                var row = table.appendChild(elemc('tr', 'row'));
                row.style.height = pixel + 'px';
                line.forEach((item)=>{
                    row.appendChild(elemc('td', item));
                })
            });
            return table;
        }

        wrap.appendChild(drawBackground());

        return {
            /** 关卡对象 */
            level: level,
            /** 游戏 DOM 根节点对象 */
            wrap: wrap,
            /** 动态元素 DOM 根节点对象 */
            actors: null,
            /** 绘制背景 */
            drawBackground: drawBackground,
            /**
             * 绘制动态元素
             */
            drawActors : function() {
                var wrap = elemc('div');
                this.level.actors.forEach((actor)=>{
                    var item = wrap.appendChild(elemc('div', 'actor ' + actor.type));
                    item.style.width = actor.size.x * pixel + 'px';
                    item.style.height = actor.size.y * pixel + 'px';
                    item.style.left = actor.pos.x * pixel + 'px';
                    item.style.top = actor.pos.y * pixel + 'px';
                });
                return wrap;
            },
            /**
             * 滚动视口，保持玩家在视口中央位置
             */
            scrollView: function() {
                var width = this.wrap.clientWidth;
                var height = this.wrap.chientHeight;
                var margin = width/3;
                
                // 观察点
                var left = this.wrap.scrollLeft,
                    right = left + width,
                    top = this.wrap.scrollTop,
                    bottom = top + height;

                var player = this.level.player;
                var center = player.pos.plus(player.size.scale(0.5)).scale(pixel);

                // todo: 滚动视口

            },
            /**
             * 更新视图
             */
            update: function() {
                if(this.actors) {
                    this.wrap.removeChild(this.actors);
                }
                this.actors = this.wrap.appendChild(this.drawActors());
                this.wrap.className = 'game ' + (this.level.status || '');
                this.scrollView();
            }
        };
    }


    /**
     * 简单关卡示例
     */
    var simpleLevel = new Level(simpleLevelPlan);
    var view = new DOMRender(simpleLevel, document.getElementById('container'));
    view.update();
    console.log('<'+simpleLevel.width+','+simpleLevel.height+'>');

}, false);