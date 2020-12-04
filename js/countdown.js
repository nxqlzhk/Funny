// 求两个日期之间差
function getInterval(start, end) {
    // 两个日期对象，相差的毫秒数
    let interval = end - start;
    // 求 相差的天数/小时数/分钟数/秒数
    let day, hour, minute, second;

    // 两个日期对象，相差的秒数
    // interval = interval / 1000;
    interval /= 1000;

    day = Math.round(interval / 60 / 60 / 24);
    hour = Math.round(interval / 60 / 60 % 24);
    minute = Math.round(interval / 60 % 60);
    second = Math.round(interval % 60);

    return {
        day: day,
        hour: hour,
        minute: minute,
        second: second
    };
}

// 处理innerText和textContent的兼容性问题
// 设置标签之间的内容
function setInnerText(element, content) {
    // 判断当前浏览器是否支持 innerText
    if (typeof element.innerText === 'string') {
        element.innerText = content;
    } else {
        element.textContent = content;
    }
}

let endDate = new Date('2021-01-01 0:0:0');
let spanDay = $('day');
let spanHour = $('hour');
let spanMinute = $('minute');
let spanSecond = $('second');
setInterval(countdown, 1000);
// 倒计时
countdown();

function countdown() {
    let startDate = new Date();
    //计算两个日期差
    let interval = getInterval(startDate, endDate);
    setInnerText(spanDay, interval.day);
    setInnerText(spanHour, interval.hour);
    setInnerText(spanMinute, interval.minute);
    setInnerText(spanSecond, interval.second);
}