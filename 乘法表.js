var str = '';
function getSpace(len){
    var spaces = '';
    for(var i = 0;i < len;i ++){
        spaces += ' ';
    }
    return spaces;
}
for(var i = 9;i >= 1; i --){
    str = '';
    for(var j = 9; j >= 1; j --){
        if(j > i){
            str += getSpace(8);
            continue;
        }
        var count = `${i}*${j}=${i * j}`;
        str += count + getSpace(6 - count.length) + '  ';
    }
    console.log(str);
}