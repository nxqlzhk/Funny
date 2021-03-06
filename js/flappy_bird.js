// 让小鸟能飞；水平：移动的背景；垂直：飞翔的高度；定时器
// 动画原理 leader = leader + step；
let game = document.getElementById('game');
let birdEle = document.getElementById('bird');
// 初始化背景图的值
let sky = {
    x: 0
};
// 初始化bird的值
let bird = {
    speedX: 5,
    speedY: 0,
    x: birdEle.offsetLeft,
    y: birdEle.offsetTop
};
// 游戏状态
let running = true;
setInterval(function () {
    if (running) {
        // 移动背景让小鸟实现水平运动
        sky.x -= 5;
        game.style.backgroundPositionX = sky.x + 'px';
        // 实现小鸟的上下运动
        bird.speedY += 1;
        bird.y += bird.speedY;
        if (bird.y < 0) {
            running = false;
            bird.y = 0;
        }
        if (bird.y + birdEle.offsetHeight > 600) {
            running = false;
            bird.y = 600 - birdEle.offsetHeight;
        }

        birdEle.style.top = bird.y + 'px';
    }
}, 30);
// 单击文档小鸟向上运动
document.onclick = function () {
    bird.speedY = -10;
};


// 定义函数创建管道
function createPipe(position) {
    let pipe = {};
    pipe.x = position;
    // 管道的高度
    pipe.uHeight = 200 + parseInt(Math.random() * 100);
    pipe.dHeight = 600 - pipe.uHeight - 200;
    pipe.dTop = pipe.uHeight + 200;
    // 上管道
    let uPipe = document.createElement('div');
    uPipe.style.width = '52px';
    uPipe.style.height = pipe.uHeight + 'px';
    uPipe.style.background = 'url("images/pipe2.png") no-repeat center bottom';
    uPipe.style.position = 'absolute';
    uPipe.style.top = '0px';
    uPipe.style.left = pipe.x + 'px';
    game.appendChild(uPipe);

    // 下管道
    let dPipe = document.createElement('div');
    dPipe.style.width = '52px';
    dPipe.style.height = pipe.dHeight + 'px';
    dPipe.style.background = 'url("./images/pipe1.png") no-repeat center  top';
    dPipe.style.position = 'absolute';
    dPipe.style.top = pipe.dTop + 'px';
    dPipe.style.left = pipe.x + 'px';
    game.appendChild(dPipe);

    // 让管道运动起来
    setInterval(function () {
        if (running) {
            pipe.x -= 2;
            uPipe.style.left = pipe.x + 'px';
            dPipe.style.left = pipe.x + 'px';
            if (pipe.x < -52) {
                pipe.x = 800;
            }
            let uCheck = bird.x + 34 > pipe.x && bird.x < pipe.x + 52 && bird.y < pipe.uHeight;
            let dCheck = bird.x + 34 > pipe.x && bird.x < pipe.x + 52 && bird.y > pipe.uHeight + 200;
            if (uCheck || dCheck) {
                running = false;
            }
        }
    }, 30);
}
createPipe(400);
createPipe(600);
createPipe(800);
createPipe(1000);