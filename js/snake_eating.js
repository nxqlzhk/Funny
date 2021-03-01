let map = document.getElementById('map');
let position = 'absolute';

// ----------------------食物对象------------------------

// 记录上一次创建的食物 为删除做准备
let elements = [];

function Food(options) {
    options = options || {};
    this.x = options.x || 0;
    this.y = options.y || 0;

    this.width = options.width || 20;
    this.height = options.height || 20;

    this.color = options.color || 'green';

}

Food.prototype.render = function (map) {

    // 删除之前的食物
    remove();

    // 随机生成x,y的值
    this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width;
    this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height;

    // 动态生成div
    let div = document.createElement('div');
    map.appendChild(div);

    elements.push(div);

    div.style.position = position;
    div.style.left = this.x + 'px';
    div.style.top = this.y + 'px';
    div.style.width = this.width + 'px';
    div.style.height = this.height + 'px';
    div.style.backgroundColor = this.color;


}

function remove() {
    for (let i = elements.length - 1; i >= 0; i--) {
        // 删除div
        elements[i].parentNode.removeChild(elements[i]);
        // 删除数组中的元素
        elements.splice(i, 1);
    }
}
// 随机生成方块
let Tools = {
    getRandom: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};



// ----------------------蛇对象------------------------

// 记录上一次蛇的位置 为删除做准备
let snakeElements = [];

function Snake(options) {
    options = options || {};
    this.width = options.width || 20;
    this.height = options.height || 20;
    // 蛇移动的方向
    this.direction = options.direction || 'right';
    // 蛇的身体 第一个元素是蛇头
    this.body = [{
            x: 3,
            y: 2,
            color: 'red'
        },
        {
            x: 2,
            y: 2,
            color: 'blue'
        },
        {
            x: 1,
            y: 2,
            color: 'blue'
        }
    ];

    Snake.prototype.render = function (map) {
        // 删除之前的蛇
        snakeRemove();
        // 把每一个蛇节渲染到地图上
        for (let i = 0, len = this.body.length; i < len; i++) {
            // 蛇节
            let object = this.body[i];

            let div = document.createElement('div');
            map.appendChild(div);

            // 记录蛇的信息
            snakeElements.push(div);

            // 设置样式
            div.style.position = position;
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.left = object.x * this.width + 'px';
            div.style.top = object.y * this.height + 'px';
            div.style.backgroundColor = object.color;
        }
    }
}

Snake.prototype.move = function (food, map) {
    // 控制蛇的身体移动
    for (let i = this.body.length - 1; i > 0; i--) {
        this.body[i].x = this.body[i - 1].x;
        this.body[i].y = this.body[i - 1].y;
    }
    // 控制蛇头的移动 判断蛇移动的方向

    let head = this.body[0];
    switch (this.direction) {
        case 'right':
            head.x += 1;
            break;
        case 'left':
            head.x -= 1;
            break;
        case 'top':
            head.y -= 1;
            break;
        case 'bottom':
            head.y += 1;
            break;
    }

    // 2.3 当蛇吃到食物 
    let headX = head.x * this.width;
    let headY = head.y * this.height;
    if (headX === food.x && headY === food.y) {
        // 蛇节加一
        // 获取蛇的最后一节
        let last = this.body[this.body.length - 1];
        this.body.push({
            x: last.x,
            y: last.y,
            color: last.color
        })

        // 随机在地图上生成食物
        food.render(map);
    }
}

function snakeRemove() {
    for (let i = snakeElements.length - 1; i >= 0; i--) {
        snakeElements[i].parentNode.removeChild(snakeElements[i]);
        snakeElements.splice(i, 1);
    }
}



// ----------------------游戏对象------------------------

// 记录游戏对象
let that;

function Game(map) {
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
    that = this;
}

Game.prototype.start = function () {
    // 1.把蛇和食物对象，渲染到地图上
    this.food.render(this.map);
    this.snake.render(this.map);
    // 2.开始游戏
    // 2.1 让蛇移动起来 遇到边界游戏结束
    runSnake();
    // 2.2 通过键盘控制蛇移动的方向
    bindKey()
    // 2.3 当蛇遇到食物
}

// 2.1 让蛇移动起来 遇到边界游戏结束
function runSnake() {
    let timeId = setInterval(function () {
        this.snake.move(this.food, this.map);
        this.snake.render(this.map);

        // 获取蛇头的坐标
        let maxX = this.map.offsetWidth / this.snake.width;
        let maxY = this.map.offsetHeight / this.snake.height;
        let headX = this.snake.body[0].x;
        let headY = this.snake.body[0].y;
        if (headX < 0 || headX >= maxX) {
            alert('Game Over!');
            clearInterval(timeId);
        }
        if (headY < 0 || headY >= maxY) {
            alert('Game Over!');
            clearInterval(timeId);
        }
    }.bind(that), 150);
}

// 2.2 通过键盘控制蛇移动的方向
function bindKey() {
    document.addEventListener('keydown', function (e) {
        switch (e.keyCode) {
            case 37:
                this.snake.direction = 'left';
                break;
            case 38:
                this.snake.direction = 'top';
                break;
            case 39:
                this.snake.direction = 'right';
                break;
            case 40:
                this.snake.direction = 'bottom';
                break;
        }
    }.bind(that), false)
}

let game = new Game(map);
game.start();