/* jshint esversion: 6 */
const https = require('https');
const cheerio = require('cheerio');
const url = 'https://segmentfault.com/a/1190000019496107';

https.get(url, function (res) {
    var html = '';
    res.on('data', function (data) {
        html += data;
    });
    res.on('end', function () {
        console.log(html);
        var $ = cheerio.load(html);
    });
}).on('error', function () {
    console.log('获取资源出错！');
});