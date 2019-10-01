const Server = require('ws').Server;
const HOST = 'wss://danmuproxy.douyu.com';
const PORT = 8503;
const ws = new Server(`${HOST}:${PORT}`);
ws.onopen = () => {
    // 发送登录命令
    wws.onmessage = (message) => {
        console.log(message);
    }
}