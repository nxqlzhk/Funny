// 随机生成数字对象
let Tools = {
    getRandom: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

// 方块对象
function Box(parent, options) {
    // 防止没有传递参数而出错
    options = options || {};
    // 设置对象的属性
    this.backgroundColor = options.backgroundColor || 'red';
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.x = options.x || 0;
    this.y = options.y || 0;

    this.div = document.createElement('div');
    parent.appendChild(this.div);
    this.parent = parent;
    this.init();
}

// 初始化div的样式
Box.prototype.init = function () {
    let div = this.div;
    div.style.backgroundColor = this.backgroundColor;
    div.style.width = this.width + 'px';
    div.style.height = this.height + 'px';
    div.style.left = this.x + 'px';
    div.style.top = this.y + 'px';
    div.style.position = 'absolute';
};

// 随机生成方块
Box.prototype.random = function () {
    // 随机生成方块坐标
    let x = Tools.getRandom(0, this.parent.offsetWidth / this.width - 1) * this.width;
    let y = Tools.getRandom(0, this.parent.offsetHeight / this.height - 1) * this.height;

    this.div.style.left = x + 'px';
    this.div.style.top = y + 'px';
};

// 获取父容器
let parent = document.getElementById('container');
// 定义一个数组用来存储方块
let array = [];
for (let i = 0; i < 10; i++) {
    let r = Tools.getRandom(0, 255);
    let g = Tools.getRandom(0, 255);
    let b = Tools.getRandom(0, 255);
    let box = new Box(parent, {
        backgroundColor: 'rgb(' + r + ',' + g + ',' + b + ')',
    });
    // 把方块存储到数组中
    array.push(box);
}

function randomBox() {
    for (let i = 0; i < array.length; i++) {
        let box = array[i];
        box.random();
    }
}

// 设置定时器
setInterval(randomBox, 500);

// 页面加载完成时触发随机生成函数
randomBox();