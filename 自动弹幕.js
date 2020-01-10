let input = document.getElementsByClassName('ChatSend-txt')[0];
let btn = document.getElementsByClassName('ChatSend-button')[0];
let timer = null;
let event = document.createEvent('HTMLEvents');
event.initEvent("click", true, true);
let text = '好听❤好听❤好听❤好听❤好听❤好听❤好听❤好听❤好听❤好听';
input.value = text;

timer = setInterval(() => {
    input.value = text;
    setTimeout(() => {
        btn.dispatchEvent(event);
    }, 1000);
}, 11000);

// clearInterval(timer);