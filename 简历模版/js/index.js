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
const BASE_INTERVAL = 0.01 * 1000;
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
// HTML 代码区
let HTMLCodes = document.getElementsByClassName('HTML-codes')[0];
// CSS 代码区
let CSSCodes = document.getElementsByClassName('CSS-codes')[0];
// 效果展示区
let display = document.getElementsByClassName('display')[0];
// head 标签
let head = document.getElementsByTagName('head')[0];
// 新建一个 style 标签来动态添加 css
let style = document.createElement('style');
// 把新建的 style 标签添加到 head
head.appendChild(style);

// console.log(operationBtns.outerHTML);

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

;(async function() {
    // 为操作按钮设置事件
    operationBtnEvents();
    // 展示 introduce
    await setIntroduce();
    // 展示代码
    await coding();
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
        // 暂停状态下无限循环等待
        while (!playStatus.play) {
            await Sleep(100);
        }
        // 等待异步完成
        await toPromise(word).then(word => {
            // 把文字添加到段落里
            pre.innerText += word;
            // 滚动条滚到最底部
            wordsArea.scrollTop = wordsArea.scrollHeight;
        });
    }
}

/**
 * @description 带缩进的段落添加
 * @param {object} el 指定元素
 * @param {string} text 段落中的文字
 * @param {number} spaces 缩进空格数
 */

async function addParagraphWithIndent(el, text, spaces) {
    // 创建段落
    let pre = document.createElement('pre');
    // 把字符串转成数组
    text = (spaces ? Array(spaces).fill(' ').join('') : '') + text;
    let words = text.split('');
    // 把段落添加到显示区域
    el.appendChild(pre);
    // 一次添加文字
    for (let word of words) {
        // 换行符
        if (word.charCodeAt() == 10) {
            // 后面补空格
            word += spaces ? Array(spaces).fill(' ').join('') : '';
        }
        // 暂停状态下无限循环等待
        while (!playStatus.play) {
            await Sleep(100);
        }
        // 等待异步完成
        await toPromise(word).then(word => {
            // 把文字添加到段落里
            pre.innerText += word;
            // 滚动条滚到最底部
            el.scrollTop = el.scrollHeight;
        });
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
    await showCodesArea();
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
async function showCodesArea() {
    codesArea.style.opacity = 1;
    toHTMLCodeArea();
    await Sleep(1000);
}

// test
HTMLBtn.onclick = toHTMLCodeArea;
CSSBtn.onclick = toCSSCodeArea;

// 切换到 HTML 代码区
function toHTMLCodeArea() {
    Tools.addClass(HTMLBtn, 'btn-selected');
    Tools.removeClass(CSSBtn, 'btn-selected');
    displaySlide.style.left = '0';
}

// 切换到 CSS 代码区
function toCSSCodeArea() {
    Tools.addClass(CSSBtn, 'btn-selected');
    Tools.removeClass(HTMLBtn, 'btn-selected');
    displaySlide.style.left = '-100%';
}

async function coding() {
    // 遍历每个步骤
    for (let i = 0; i < DATA.code.length; i++) {
        // 渲染描述
        let descriptions = DATA.code[i].description;
        // 添加描述的区域
        let desDom = document.getElementsByClassName('words')[0];
        // 遍历描述
        for (let des of descriptions) {
            // 按段渲染描述
            await addParagraph(desDom, des);
        }
        // HTML 代码
        let htmlCodes = DATA.code[i].code.html;
        // 判断是否有 HTML 代码,有则切换到 HTML 代码模块
        if (htmlCodes.length) {
            // 切换到 HTML 代码区域
            toHTMLCodeArea();
            // 等待切换
            await Sleep(500);
            // 添加 HTML 代码的区域
            let hDom = document.querySelector(`div[data-step='${i}']`);
            let htmlDom = hDom ? hDom : HTMLCodes;
            for (let htmlCode of htmlCodes) {
                // 无插入代码
                if (!htmlCode.insert) {
                    await addParagraphWithIndent(htmlDom, htmlCode.code, htmlCode.indent);
                }
                // 有要插入的代码
                else {
                    let div = document.createElement('div');
                    div.setAttribute('data-step', htmlCode.content);
                    htmlDom.append(div);
                }
            }
        }
        // CSS 代码
        let cssCodes = DATA.code[i].code.css;
        if (cssCodes.length) {
            // 切换到 CSS 代码区域
            toCSSCodeArea();
            await Sleep(500);
            // 添加 CSS 代码的区域
            // 所有 CSS 都顺序添加,所以不用判断是否有插入代码
            let cssDom = CSSCodes;
            for (let cssCode of cssCodes) {
                await addParagraphWithIndent(cssDom, cssCode.code, cssCode.indent);
            }
        }
        window[`step${i}`]();
    }
}

// 动态添加 CSS 代码
function addCSS(text) {
    try {
        let textNode = document.createTextNode(text);
        style.appendChild(textNode);
    }
    catch (e) {
        style.styleSheet.cssText = text;
    }
}

// 对应步骤完后显示对应效果
// 0.添加html,效果什么都不显示
function step0() {
    
}

// 1.显示轮廓
function step1() {
    // 显示展示区
    let displayContainer = document.createElement('div');
    Tools.addClass(displayContainer, 'display-container');
    display.append(displayContainer);
    addCSS(':root {--info-bgColor: #00968f;--detail-bgColor: #fff;}');
    addCSS('.display-container {width: 100%;height: 100%;margin: 0 auto;box-shadow: 0 0 10px 10px #00968f inset;display: flex;-webkit-box-reflect: below 10px -webkit-linear-gradient(bottom, rgba(255, 255, 255, 0.3) 0%, transparent 40%, transparent 100%);}');
}

// 2.分模块:个人信息 详细信息
function step2() {
    let displayContainer = display.getElementsByClassName('display-container')[0];
    let info = document.createElement('div');
    Tools.addClass(info, 'info');
    displayContainer.append(info);
    let detail = document.createElement('div');
    Tools.addClass(detail, 'detail');
    displayContainer.append(detail);
    addCSS('.display-container .info {width: 30%;height: 100%;background: var(--info-bgColor);color: #fff;}');
    addCSS('.display-container .detail {width: 70%;height: 100%;background: var(--detail-bgColor);}');
}

// 3.显示头像
function step3() {
    let info = display.getElementsByClassName('info')[0];
    let avatar = document.createElement('div');
    Tools.addClass(avatar, 'avatar');
    info.append(avatar);
    addCSS(`.display-container .avatar {width: 120px;height: 120px;background: url('./avatar.jpg');background-size: contain;margin: 20px auto 20px;border-radius: 50%;}`);
}