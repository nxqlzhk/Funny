window.onload = function () {
    /*
    1 获取到.itemBox 宽度
    2 获取到.item 宽度
    3 求出列数
    4 求出间距
    5 实现瀑布流布局的方法
    6 滚动页面时 加载数据
    */

    // 获取元素
    let itemBox = document.getElementsByClassName('itemBox')[0];
    let items = document.getElementsByClassName('item');
    // 1 获取 .itemBox的宽度
    let itemBoxW = itemBox.offsetWidth;
    // 2 获取 .item的宽度
    let itemW = items[0].offsetWidth;
    // 3 求出列数
    let column = parseInt(itemBoxW / itemW);
    // 4 求出间距
    let space = (itemBoxW - itemW * column) / (column - 1);

    // 定义一个数组储存每一列的高度
    let arr = [];
    // 调用瀑布流方法
    waterFull();

    // 滚动页面时 加载数据
    window.onscroll = function () {
        // pageXOffset 和 pageYOffset 属性返回文档在窗口左上角水平和垂直方向滚动的像素,兼容方案 (在 IE8 其更早版本中使用 scrollLeft 和 scrollTop):
        // innerHeight 返回窗口的文档显示区的高度。
        if (window.pageYOffset + window.innerHeight > getMin(arr).minH) {
            let json = [{
                    "src": "images/P_000.jpg"
                },
                {
                    "src": "images/P_001.jpg"
                },
                {
                    "src": "images/P_002.jpg"
                },
                {
                    "src": "images/P_003.jpg"
                },
                {
                    "src": "images/P_004.jpg"
                },
                {
                    "src": "images/P_005.jpg"
                },
                {
                    "src": "images/P_006.jpg"
                },
                {
                    "src": "images/P_007.jpg"
                },
                {
                    "src": "images/P_008.jpg"
                },
                {
                    "src": "images/P_009.jpg"
                },
                {
                    "src": "images/P_010.jpg"
                }
            ];
            // 添加数据
            for (let i = 0; i < json.length; i++) {
                let div = document.createElement('div');
                div.className = 'item';
                let img = document.createElement('img');;
                img.src = json[i].src;
                div.appendChild(img);
                itemBox.appendChild(div);
            }
            waterFull();
        }
    }

    //5 实现瀑布流的方法
    function waterFull() {
        for (let i = 0; i < items.length; i++) {
            if (i < column) {
                items[i].style.left = (itemW + space) * i + 'px';
                arr[i] = items[i].offsetHeight;
            } else {
                let minH = getMin(arr).minH;
                let index = getMin(arr).index;
                items[i].style.left = (itemW + space) * index + 'px';
                items[i].style.top = minH + space + 'px';
                arr[index] = minH + space + items[i].offsetHeight;
            }
        }
    }

    // 获取一列中最小高度和索引
    function getMin(arr) {
        let obj = {};
        obj.minH = arr[0];
        obj.index = 0;
        for (let i = 1; i < arr.length; i++) {
            if (obj.minH > arr[i]) {
                obj.minH = arr[i];
                obj.index = i;
            }
        }
        return obj;
    }

}