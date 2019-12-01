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

;(function() {
    // console.log(DATA);
    operationBtnEvents();
})();

// 操作按钮注册事件
function operationBtnEvents() {
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
            }
            else if (name === 'speed') {
                // 根据当前速度改变按钮样式
                setSpeedStyle(value);
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
    let event = document.createEvent('HTMLEvents');
    event.initEvent("click", true, true);
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