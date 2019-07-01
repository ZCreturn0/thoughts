/* jshint esversion: 6 */
const fs = require('fs');
const cheerio = require('cheerio');
const http = require('http');

function filterCharacter(str){
    // var resultStr = str.replace(/\ +/g, "");     //去掉空格
    // resultStr = resultStr.replace(/[ ]/g, "");   //去掉空格
    // var resultStr = str.replace(/[\n]/g, "");    //去掉换行
    var resultStr = str.replace(/[\r]/g, "");       //去掉回车
    resultStr = resultStr.replace(/[\\]/g, "");     //去掉\
    resultStr = resultStr.replace(/[\"]/g, "");     //去掉\
    return resultStr;
}

var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    fs.readFile('../抓取数据/raw.html', (err, data) => {
        if (err) {
            console.log('先抓取数据!!!');
        }
        else {
            var $ = cheerio.load(data);
            var questions = [];
            for (let i = 0; i < 43; i++) {
                var question = {};
                var titleNode = $($(`.article__content h3`)[i]);
                var codeNode = $($($(`.article__content h3`)[i]).next('pre')[0]).find('code')[0];
                question.title = titleNode.text();
                var code = $(codeNode).text();
                if (code) {
                    question.code = filterCharacter(code);
                }
                else {
                    question.code = '';
                }
                questions.push(question);
            }
            console.log(questions);
            res.end(JSON.stringify(questions));
        }
    });
});
server.listen(8080, function () {
    console.log('listening on localhost:8080');
});