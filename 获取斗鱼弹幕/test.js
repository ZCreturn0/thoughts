const net = require('net');

let roomid = '2550505';

//创建连接
const s = net.connect({
    port: 80,
    host: 'openapi-danmu.douyu.com'
}, () => {
    console.log('弹幕服务器连接成功……');
});

var msg = 'type@=loginreq/roomid@=' + roomid + '/';
sendData(s, msg);
msg = 'type@=joingroup/rid@=' + roomid + '/gid@=-9999/';
sendData(s, msg);

s.on('data', (chunk) => {
    formatData(chunk);
});

s.on('error', (err) => {
    console.log(err);
});

setInterval(() => {
    // let timestamp = parseInt(new Date()/1000);
    let msg = 'type@=mrkl/';
    sendData(s, msg);
}, 45000);


/**
 * 发送数据方法
 */
function sendData(s, msg) {
    let data = new Buffer(msg.length + 13);
    data.writeInt32LE(msg.length + 9, 0);
    data.writeInt32LE(msg.length + 9, 4);
    data.writeInt32LE(689, 8);
    data.write(msg + '\0', 12);
    s.write(data);
}

function formatData(msg) {
    const sliced = msg.slice(12).toString();
    // 减二删掉最后的'/'和'\0'
    const splited = sliced.substring(0, sliced.length - 2).split('/');
    const map = formatDanmu(splited);
    analyseDanmu(map);
}

function formatDanmu(msg) {
    let map = {};
    for (let i in msg) {
        let splited = msg[i].split('@=');
        map[splited[0]] = splited[1];
    }
    return map;
}

function analyseDanmu(msg) {
    if (msg['type'] == 'chatmsg') {
        // insertData(msg, "danmu");
        console.log("%s: %s", msg['nn'], msg['txt']);
    }
    if (msg['type'] == 'uenter') {
        // insertData(msg, "user");
        console.log(msg['nn'] + '进入了直播间');
    }
}