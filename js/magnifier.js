// 获取鼠标在页面的位置，处理浏览器兼容性
function getPage(e) {
    let pageX = e.pageX || e.clientX + getScroll().scrollLeft;
    let pageY = e.pageY || e.clientY + getScroll().scrollTop;
    return {
        pageX: pageX,
        pageY: pageY
    };
}

let box = $('box');
let smallBox = box.children[0];
let bigBox = box.children[1];

let smallImage = smallBox.children[0];
let mask = smallBox.children[1];
let bigImage = bigBox.children[0];


// 1 鼠标经过的时候 显示 mask和bigBox，当鼠标离开box的时候隐藏mask和bigBox
// 
// mouseenter   mouseleave     不会触发事件冒泡
// mouseover   mouseout        会触发事件冒泡
box.onmouseenter = function () {
    // 显示 mask和bigBox 
    mask.style.display = 'block';
    bigBox.style.display = 'block';
};

box.onmouseleave = function () {
    mask.style.display = 'none';
    bigBox.style.display = 'none';
};

// 2 当鼠标在盒子中移动的时候，让mask和鼠标一起移动
box.onmousemove = function (e) {
    // 浏览器兼容性
    e = e || window.event;
    // 获取鼠标在盒子中的位置，就是mask的坐标
    let maskX = getPage(e).pageX - box.offsetLeft;
    let maskY = getPage(e).pageY - box.offsetTop;

    // 让鼠标出现在mask的中心点
    maskX = maskX - mask.offsetWidth / 2;
    maskY = maskY - mask.offsetHeight / 2;

    // 把mask限制到box中
    maskX = maskX < 0 ? 0 : maskX;
    maskY = maskY < 0 ? 0 : maskY;

    maskX = maskX > box.offsetWidth - mask.offsetWidth ? box.offsetWidth - mask.offsetWidth : maskX;
    maskY = maskY > box.offsetHeight - mask.offsetHeight ? box.offsetHeight - mask.offsetHeight : maskY;


    mask.style.left = maskX + 'px';
    mask.style.top = maskY + 'px';
    // 3 当mask移动的时候，让大图片移动
    // 求 大图片移动的距离

    // mask移动的距离 / mask最大能够移动的距离  = 大图片移动的距离 / 大图片最大能够移动的距离

    // mask最大能够移动的距离
    let maskMax = box.offsetWidth - mask.offsetWidth;
    // 大图片最大能够移动的距离
    let bigImageMax = bigImage.offsetWidth - bigBox.offsetWidth;

    let bigImageX = maskX * bigImageMax / maskMax;
    let bigImageY = maskY * bigImageMax / maskMax;

    bigImage.style.left = -bigImageX + 'px';
    bigImage.style.top = -bigImageY + 'px';
}