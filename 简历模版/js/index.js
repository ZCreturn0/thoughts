// 工具函数对象
class Tools {
    static tool = null;
    constructor() {
        
    }
    // 单例
    static getInstance() {
        return Tools.tool || (Tools.tool = new Tools());
    }
}

// 操作按钮注册事件
function operationBtnEvents() {
    let pauseBtn = document.getElementsByClassName('pause')[0];
    let speedUp = document.getElementsByClassName('speedUp')[0];
}

// 入口函数
function run() {
    // console.log(DATA);
    console.log(Tools.getInstance());
}

run();