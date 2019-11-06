let banner = document.getElementsByClassName('home-banner')[0];
// 轮播图数量
const BG_NUMBER = 2;
// 轮播间隔(毫秒)
const INTERVAL = 5 * 1000;
let index = 0;
setInterval(() => {
    index = (index + 1) % BG_NUMBER;
    banner.style.background = `url('./images/bg${index}.jpg') no-repeat center`;
}, INTERVAL);