// 搜索按钮切换
let searchBtn1 = document.getElementsByClassName('logo22-1')[0];
let searchBtn2 = document.getElementsByClassName('logo22-2')[0];
searchBtn1.onclick = function () {
    searchBtn2.classList.remove('searchSelected');
    this.classList.add('searchSelected');
}
searchBtn2.onclick = function () {
    searchBtn1.classList.remove('searchSelected');
    this.classList.add('searchSelected');
}

// 下拉
let navItem = document.getElementsByClassName('wtacent');
for (let nav of navItem) {
    nav.onmouseover = function(){
        this.getElementsByClassName('dhxlcd')[0].style.display = 'block';
    }
    nav.onmouseout = function () {
        this.getElementsByClassName('dhxlcd')[0].style.display = 'none';
    }
}

// 轮播
let index = 0;
const INTERVAL = 5 * 1000;
// 轮播图数量
const LENGTH = 5;
// 定时器
let timer = null;
let bg = document.getElementById('bg');
let rotate = document.getElementsByClassName('rotate');
function setRotateStyle(){
    for (let item of rotate) {
        item.classList.remove('cur');
    }
    rotate[index].classList.add('cur');
    bg.style.background = `url('./images/${index}.jpg') center top no-repeat`;
}
setRotateStyle();
for (let item of rotate) {
    item.onclick = function(){
        index = this.getAttribute('data-index') - 0;
        setRotateStyle();
        clearInterval(timer);
        timer = setInterval(() => {
            index = (index + 1) % LENGTH;
            setRotateStyle();
        }, INTERVAL);
    }
}
timer = setInterval(() => {
    index = (index + 1) % LENGTH;
    setRotateStyle();
}, INTERVAL);