window.addEventListener('load', ()=>{

    /**
     * 简单关卡平面图
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
            width: width,
            height: height,
            grid: grid,
            actors: actors,
            player: player,
            status: null,
            finishDelay: null,

            /**
             * 判断关卡是否结束
             */
            isFinished: ()=>{
                return this.status != null && this.finishDelay < 0;
            }
        };
    }

    /**
     * 矢量类：用于保存活动元素的位置和尺寸
     */
    function Vector(x, y) {
        var x = x, y= y;
        return {
            plus: function(other) {
                return new Vector(x+other.x, y+other.y);
            },
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
            type: 'player',
            pos: pos.plus(new Vector(0, -0.5)),
            size: new Vector(0.8, 1.5),
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
            type: 'lava',
            pos: pos,
            size: new Vector(1, 1),
            speed: speed
        }
    }
    /**
     * 活动元素 - 钱币类
     */
    function Coin(pos) {
        var pos = pos.plus(new Vector(0.2, 0.1));
        return {
            type: 'coin',
            basePos: pos,
            pos: pos,
            size: new Vector(0.6, 0.6),
            wobble: Math.random()*Math.PI*2
        }
    }

    /**
     * 简单关卡示例
     */
    var simpleLevel = new Level(simpleLevelPlan);
    console.log('<'+simpleLevel.width+','+simpleLevel.height+'>');

}, false);