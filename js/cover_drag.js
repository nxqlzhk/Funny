// 显示登录框和遮盖层
let login = document.getElementById('login');
let bg = document.getElementById('bg');
// 1 点击按钮，弹出登录框和遮盖层
let link = document.getElementById('link');
link.onclick = function () {
    login.style.display = 'block';
    bg.style.display = 'block';
    return false;
};

// 2 点击关闭按钮，隐藏 登录框和遮盖层
let closeBtn = document.getElementById('closeBtn');
closeBtn.onclick = function () {
    // 隐藏 登录框和遮盖层
    login.style.display = 'none';
    bg.style.display = 'none';
};

// 3 拖拽
let title = document.getElementById('title');
title.onmousedown = function (e) {
    // 鼠标按下，求鼠标在盒子中的位置
    let x = e.pageX - login.offsetLeft;
    let y = e.pageY - login.offsetTop;

    document.onmousemove = function (e) {
        // 鼠标移动的时候， 盒子的坐标
        let loginX = e.pageX - x;
        let loginY = e.pageY - y;

        login.style.left = loginX + 256 + 'px';
        login.style.top = loginY - 140 + 'px';
    };
};

document.onmouseup = function () {
    // 移除鼠标移动的事件
    document.onmousemove = null;
};