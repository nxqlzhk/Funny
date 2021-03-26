// 封装获取元素ID
function $(id) {
    return document.getElementById(id);
}

// let timerId = null;
// 封装动画的函数
function animate(element, target, interval) {
    // 通过判断，保证页面上只有一个定时器在执行动画
    if (element.timerId) {
        clearInterval(element.timerId);
        element.timerId = null;
    }

    element.timerId = setInterval(function () {
        // 步进  每次移动的距离
        let step = 10;
        // 盒子当前的位置
        let current = element.offsetLeft;

        // 判断如果当前位置 > 目标位置 此时的step  要小于0
        if (current > target) {
            step = -Math.abs(step);
        }

        // Math.abs(current - target)   <= Math.abs(step)
        if (Math.abs(current - target) <= Math.abs(step)) {
            // 让定时器停止
            clearInterval(element.timerId);
            // 让盒子到target的位置
            element.style.left = target + 'px';
            return;
        }
        // 移动盒子
        current += step;
        element.style.left = current + 'px';
    }, interval);
}

let newsT = $('newsT');
let flag = $('flag');
let newsContainer = $('newsContainer');
// 获取a标签的自定义属性，记录索引
for (let i = 0; i < 2; i++) {
    let link = newsT.children[i];
    link.onmouseover = linkMouseover;
    link.setAttribute('index',i);
}

function linkMouseover() {
    let offsetLeft = this.offsetLeft;
    animate(flag, offsetLeft - 3, 30)

    for (let i = 0, len = newsContainer.children.length; i < len; i++) {
        let div = newsContainer.children[i];
        // 判断类样式是否已经有hide
        if (div.className.indexOf('hide') === -1) {
            div.className = 'news-b hide';
        }
    }
    let index = parseInt(this.getAttribute('index'));
    newsContainer.children[index].className = 'news-b show';
}