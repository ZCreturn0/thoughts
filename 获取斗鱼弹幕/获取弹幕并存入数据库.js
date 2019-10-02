const douyu_danmu = require('douyu-danmu');
const mysql = require('mysql');
const roomid = '286993';
const client = new douyu_danmu(roomid);
const dbConfig = require('./dbConfig.json');
// 每次插入数据库的数据数量
const INSERT_NUMBER = 10;

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
                msg: msg.content
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
}, 5 * 1000);

client.start();

function insertList(list){
    let addSql = 'INSERT INTO barrage(user,msg) VALUES(?,?)';
    list.forEach(item => {
        let data = [item.user, item.msg];
        connection.query(addSql, data, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
        });
    });
}