const douyu_danmu = require('douyu-danmu');
const mysql = require('mysql');
const roomid = '2550505';
const client = new douyu_danmu(roomid);
const dbConfig = require('./dbConfig.json');
// 每次插入数据库的数据数量
const INSERT_NUMBER = 30;

// root@localhost: ijuh-bkzH4xF

const connection = mysql.createConnection(dbConfig);
connection.connect();

let unsavedBarrages = [];

client.on('connect', () => {
    console.log(`已连接 ${roomid} 房间弹幕~`);
});

client.on('message', msg => {
    switch (msg.type) {
        case 'chat':
            unsavedBarrages.push({
                user: msg.from.name,
                msg: msg.content,
                time: dateFormat('YYYY-mm-dd HH:MM:SS', new Date())
            });
            console.log(`[${msg.from.name}]:${msg.content}`)
        break
        case 'gift':
            console.log(`[${msg.from.name}]->赠送${msg.count}个${msg.name}`)
        break
        case 'yuwan':
            console.log(`[${msg.from.name}]->赠送${msg.count}个${msg.name}`)
        break
        case 'deserve':
            console.log(`[${msg.from.name}]->赠送${msg.count}个${msg.name}`)
        break
    }
});

client.on('error', e => {
    console.log(e);
});

client.on('close', () => {
    console.log('close');
    connection.end();
});

setInterval(() => {
    let insertData = [];
    if (unsavedBarrages.length === 0) {
        return;
    }
    else if (unsavedBarrages.length <= INSERT_NUMBER) {
        insertData = unsavedBarrages.splice(0, unsavedBarrages.length);
    }
    else{
        insertData = unsavedBarrages.splice(0, INSERT_NUMBER);
    }
    insertList(insertData);
}, 3 * 1000);

client.start();

function insertList(list){
    let addSql = 'INSERT INTO barrage(user,msg,time) VALUES(?,?,?)';
    list.forEach(item => {
        let data = [item.user, item.msg, item.time];
        connection.query(addSql, data, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
        });
    });
}

function dateFormat(fmt, date) {
    let ret;
    let opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}