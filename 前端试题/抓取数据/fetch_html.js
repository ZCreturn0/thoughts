/* jshint esversion: 6 */
const https = require('https');
const fs = require('fs');
const url = 'https://segmentfault.com/a/1190000019496107';

https.get(url, function (res) {
    var html = '';
    res.on('data', function (data) {
        html += data;
    });
    res.on('end', function () {
        console.log(html);
        fs.writeFile('raw.html', html, (err, data) => {
            if(err){
                console.log(err);
            }
            else{
                console.log(data);
            }
        });
    });
}).on('error', function () {
    console.log('获取资源出错！');
});