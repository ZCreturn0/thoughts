// 工具函数对象
// 所有方法均为静态方法
class Tools {
    constructor() {
        if(new.target === Tools) {
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
}

;(function() {
    // console.log(DATA);
    operationBtnEvents();
})();

// 操作按钮注册事件
function operationBtnEvents() {
    let pauseBtn = document.getElementsByClassName('pause')[0];
    let speedUp = document.getElementsByClassName('speedUp')[0];
}