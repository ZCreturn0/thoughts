const express = require('express');
const cookieParser = require('cookie-parser');
var nodejieba = require("nodejieba");
const cors = require('cors');
const mysql = require('mysql');
const dbConfig = require('./dbConfig.json');

const app = express();

const connection = mysql.createConnection(dbConfig);
connection.connect();

const PORT = 10086;

// nodejieba.load({
//     dict: nodejieba.DEFAULT_DICT
// });

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
// 跨域设置
app.use(cors({
    origin: ['http://127.0.0.1:80'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', function (req, res) {
    res.send('test');
});

app.get('/getKeyWords', function (req, res) {
    let query = 'SELECT * FROM barrage';
    connection.query(query, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            // console.log(data);
            let msg = [];
            data.forEach(item => {
                msg.push(item.msg);
            });
            let keywords = {};


            let keywordsList = nodejieba.cut('等我嫖到16级，我就有机会混入管理层啦[emot:dy101][emot:dy101]');
            console.log(keywordsList);

            // msg.forEach(item => {
            //     let keywordsList = nodejieba.cut(item);
            //     keywordsList.forEach(words => {
            //         if (!keywords[words]) {
            //             keywords[words] = 1;
            //         }
            //         else{
            //             keywords[words]++;
            //         }
            //     });
            // });
            // console.log(keywords);
            res.json(keywords);
        }
    });
});

let server = app.listen(PORT, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});