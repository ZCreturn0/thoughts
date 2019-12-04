/**
 * 
 * @Author ZCreturn0
 * @Date 2019-12-01 21:25:47 
 * @Email 237350543@qq.com 
 * @Github https://github.com/ZCreturn0
 * 
 */

// 工具函数对象
// 所有方法均为静态方法
class Tools {
    constructor() {
        if (new.target === Tools) {
            throw new ReferenceError('Tools 类无需创建对象!');
        }
    }
    /**
     * @description 判断元素是否含有指定 class
     * @param {object} el 元素
     * @param {string} className 类名
     * @returns {boolean}
     */
    static hasClass(el, className) {
        return !!~[].indexOf.call(el.classList, className);
    }
    /**
     * @description 为元素移除指定 class
     * @param {object} el 元素
     * @param {string} className 类名
     */
    static removeClass(el, className) {
        el.classList.remove(className);
    }
    /**
     * @description 为元素添加指定 class
     * @param {object} el 元素
     * @param {string} className 类名
     */
    static addClass(el, className) {
        el.classList.add(className);
    }
}

// 基础打字间隔,对应 speed,可更改这个值来调整基础打字速度
const BASE_INTERVAL = 0.1 * 1000;
let INTERVAL = BASE_INTERVAL;
// 控制全局定时器
let TIMER = null;

// 点击事件触发器
let event = document.createEvent('HTMLEvents');
event.initEvent("click", true, true);

// 播放状态
const playStatus = {
    // 播放或暂停
    play: true,
    // 播放速度
    speed: 1
};
// 代理
let playStatusProxy = new Proxy(playStatus, {
    get(target, name) {
        return target[name];
    },
    set(target, name, value) {
        target[name] = value;
        if (name === 'play') {
            // 根据当前状态决定播放或暂停
            value ? resume() : pause();
        } else if (name === 'speed') {
            // 根据当前速度改变按钮样式
            setSpeedStyle(value);
            INTERVAL = BASE_INTERVAL / value;
        }
    }
});
// 暂停按钮
let pauseBtn = document.getElementsByClassName('pause')[0];
// 变速按钮
let speedUp = document.getElementsByClassName('speedUp')[0];
// 暂停变速区
let operationBtns = document.getElementsByClassName('operation-btns')[0];
// 选择速度区
let speedSelect = document.getElementsByClassName('speed-select')[0];
// 返回按钮
let backBtn = document.getElementsByClassName('back-btn')[0];
// 速度选择按钮(1X,2X,3X)
let speedBtns = document.getElementsByClassName('speed-btn');
// 介绍区
let wordsArea = document.getElementsByClassName('words')[0];
// 代码区
let codesArea = document.getElementsByClassName('codes')[0];
// 代码切换模块
let displaySlide = document.getElementsByClassName('display-slide')[0];
// HTML 按钮
let HTMLBtn = document.getElementsByClassName('HTML')[0];
// CSS 按钮
let CSSBtn = document.getElementsByClassName('CSS')[0];
// JS 按钮
let JSBtn = document.getElementsByClassName('JS')[0];

console.log(operationBtns.outerHTML);

// 暂停
function pause() {
    pauseBtn.innerText = '◀ 播放';
}
// 恢复播放
function resume() {
    pauseBtn.innerText = '▦ 暂停';
}
// 给当前速度对应按钮添加选中效果
function setSpeedStyle(speed) {
    for (let i = 0; i < speedBtns.length; i++) {
        if (speedBtns[i].getAttribute('data-speed') == speed) {
            Tools.addClass(speedBtns[i], 'btn-selected');
        } else {
            // 不是当前速度对应的按钮移除选中效果
            Tools.removeClass(speedBtns[i], 'btn-selected');
        }
    }
}

;(function() {
    // 为操作按钮设置事件
    operationBtnEvents();
    // 展示 introduce
    setIntroduce();
})();

// 操作按钮注册事件
function operationBtnEvents() {
    pauseBtn.onclick = () => {
        // 更改播放状态
        playStatusProxy.play = !playStatusProxy.play;
    };
    speedUp.onclick = () => {
        // 切换到选择速度区
        operationBtns.style.left = '-100%';
        speedSelect.style.left = '0';
        // 选择速度时暂停播放
        playStatusProxy.play = false;
        setSpeedStyle(playStatusProxy.speed);
    };
    backBtn.onclick = () => {
        // 切换到暂停变速区
        operationBtns.style.left = '0';
        speedSelect.style.left = '100%';
        // 返回时恢复播放
        playStatusProxy.play = true;
    };
    for (let i = 0; i < speedBtns.length; i++) {
        // 变速
        speedBtns[i].onclick = () => {
            let speed = speedBtns[i].getAttribute('data-speed');
            playStatusProxy.speed = speed - 0;
            // 触发返回按钮事件
            backBtn.dispatchEvent(event);
        };
    }
}

/**
 * @description 在指定的元素中添加段落
 * @param {object} el 指定元素
 * @param {string} text 段落中的文字
 */
async function addParagraph(el, text) {
    // 创建段落
    let pre = document.createElement('pre');
    // 把字符串转成数组
    let words = text.split('');
    // 把段落添加到显示区域
    el.appendChild(pre);
    // 一次添加文字
    for (let word of words) {
        // 等待异步完成
        await toPromise(word).then(word => {
            // 把文字添加到段落里
            pre.innerText += word;
            // 滚动条滚到最底部
            wordsArea.scrollTop = wordsArea.scrollHeight;
        });
        // 暂停状态下无限循环等待
        while (!playStatus.play) {
            await Sleep(100);
        }
    }
}

/**
 * @description 把异步操作包装成 Promise 返回
 * @param {any} word resolve 需要的参数
 * @returns {Promise}
 */
function toPromise(word) {
    return new Promise((resolve) => {
        // 定时器
        setTimeout(() => {
            // 延迟一段时间后把参数传回回调
            resolve(word);
        }, INTERVAL);
    });
}

/**
 * @description 在页面显示 introduce 内容
 */
async function setIntroduce() {
    // 添加内容的区域
    let el = document.getElementsByClassName('words')[0];
    // 依次添加段落
    for (let i = 0; i < DATA.introduce.length; i++) {
        // 等待异步完成
        await addParagraph(el, DATA.introduce[i]);
        // 暂停 1s 后再往下执行
        await Sleep(1000);
    }
    // 介绍完后显示代码区域
    showCodesArea();
}

/**
 * @description 暂停一段时间(什么都不做)
 * @param {number} ms 暂停的时间(单位:毫秒)
 * @returns {Promise}
 */
function Sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

/**
 * @description 显示代码区域
 */
function showCodesArea() {
    codesArea.style.opacity = 1;
}

// test
HTMLBtn.onclick = toHTMLCodeArea;
CSSBtn.onclick = toCSSCodeArea;
JSBtn.onclick = toJSCodeArea;

// 切换到 HTML 代码区
function toHTMLCodeArea() {
    Tools.addClass(HTMLBtn, 'btn-selected');
    Tools.removeClass(CSSBtn, 'btn-selected');
    Tools.removeClass(JSBtn, 'btn-selected');
    displaySlide.style.left = '0';
}

// 切换到 CSS 代码区
function toCSSCodeArea() {
    Tools.addClass(CSSBtn, 'btn-selected');
    Tools.removeClass(HTMLBtn, 'btn-selected');
    Tools.removeClass(JSBtn, 'btn-selected');
    displaySlide.style.left = '-100%';
}

// 切换到 JS 代码区
function toJSCodeArea() {
    Tools.addClass(JSBtn, 'btn-selected');
    Tools.removeClass(HTMLBtn, 'btn-selected');
    Tools.removeClass(CSSBtn, 'btn-selected');
    displaySlide.style.left = '-200%';
}