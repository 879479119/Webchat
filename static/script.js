/**
 * Created by zi on 2016/5/18.
 */

var socket = io();

socket.on('chat message', function(msg){
    log = msg;
    drawPic(log);
});

var canvas = document.getElementById("canvas");

var c = canvas.getContext("2d");

var l = 5;
var t = 5;

var draw = false;

var log = [];

canvas.addEventListener("mousedown",function (e) {
    draw = true;
    c.moveTo(e.pageX - l,e.pageY - t);
    c.lineWidth=3;
    c.strokeStyle = 'red';
    c.shadowBlur = 2;
    c.shadowColor = 'red';
    c.beginPath();
});


canvas.addEventListener("mouseup",function () {
    draw = false;
    c.closePath();
});


canvas.addEventListener("mousemove",function (e) {
    if(draw == true){
        var x = e.pageX - l,
            y = e.pageY - t;
        c.lineTo(x,y);
        log.push({x:x,y:y,z:date - datePast});
        c.stroke();

        socket.emit('chat message', log);
    }
});

/**
*  不知道有没有办法实现，一个带有执行间隔时间的队列，在指定间隔时间后按顺序进行
* */

function drawPic(log) {
    // var p = log.shift();
    // co.moveTo(p.x,p.y);
    c.beginPath();

    var p = log.shift();
    var x = p.x,
        y = p.y;
    c.lineTo(x,y);
    c.stroke();

    c.closePath();
}




