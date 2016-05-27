/**
 * Created by zi on 2016/5/18.
 */
 var color = [
    "e60012","eb6100","f39800","fcc800","fff100","cfdb00","8fc31f","22ac38",
    "009944","009b6b","009e96","00a0c1","00a0e9","0086d1","0068b7","00479d",
    "1d2088","601986","920783","be0081","e4007f","e5006a","e5004f","e60033"
 ];

var curColor = "#e60012";
var size = 1;
var hasShadow = true;

$("#choose-color").find("td").each(function(index) {
    $(this).css("background","#"+color[index])
    .attr("title","#"+color[index]).click(function() {
        curColor = "#"+color[index];
        $("#cur-color").css("background",curColor);
    }).hover(function(){
        $("#cur-show").css("background","#"+color[index]);
        $("#cur-name").html("#"+color[index]);
    },null);
});

$("#cur-color").click(function() {
    $("#choose-color").fadeIn('fast');
});

$(document).click(function(event) {
    var $choose = $("#choose-color"),
        $cur = $("#cur-color");
    if (event.target != $choose[0] && event.target != $cur[0] && $choose.has(event.target).length === 0) {
        $choose.fadeOut('fast');
    }
});

$("#size-s").click(function() {
    size = 1;
});

$("#size-m").click(function() {
    size = 2;
});

$("#size-l").click(function() {
    size = 3;
});

$("#shadow").click(function() {
    hasShadow = this.checked;
    console.log(this.checked);
});

$("#clear-all").click(function() {
    socket.emit('clear', true);
});




















var socket = io();

var canvas = document.getElementById("canvas");

var c = canvas.getContext("2d");

var l = 5;
var t = 5;

var draw = false;

var log = {};
var md5 = "";

c.lineWidth= size;
c.strokeStyle = curColor;
c.shadowBlur = 2;
c.shadowColor = 'red';

socket.on('md5', function(msg){
    if(md5 == ""){
        md5 = msg;
    }
});

socket.on('chat message', function(msg){
    msg = JSON.parse(msg);

    if(msg.z != md5){
        drawPic(msg);
    }

});

socket.on('clear', function(){
    c.clearRect(0,0,500,500);
});

socket.on('keydown', function(msg){
    msg = JSON.parse(msg);

    if(msg.z != md5){
        c.lineWidth = msg.s;
        c.strokeStyle = msg.c;
        c.shadowColor = msg.c;
        if(msg.h == false){
            c.shadowBlur = 0;
        }else{
            c.shadowBlur = 2;
        }
        c.beginPath();
        c.moveTo(msg.x,msg.y);
    }

});

socket.on('keyup', function(msg){
    msg = JSON.parse(msg);

    if(msg.z != md5){
        c.moveTo(msg.x,msg.y);
        c.closePath();

        c.shadowBlur = hasShadow?2:0;
    }

});


canvas.addEventListener("mousedown",function (e) {
    draw = true;
    c.moveTo(e.pageX - l,e.pageY - t);
    c.lineWidth= size;
    c.strokeStyle = curColor;
    c.shadowColor = curColor;
    c.shadowBlur = hasShadow?2:0;

    c.beginPath();

    socket.emit('keydown', JSON.stringify({x:e.pageX - l,y:e.pageY - t,z:md5,s:size,c:curColor,h:hasShadow}));
});

canvas.addEventListener("mouseup",function (e) {
    draw = false;
    c.closePath();

    socket.emit('keyup', JSON.stringify({x:e.pageX - l,y:e.pageY - t,z:md5}));
});


canvas.addEventListener("mousemove",function (e) {

    if(draw == true){
        var x = e.pageX - l,
            y = e.pageY - t;
        c.lineTo(x,y);
        log.x = x;
        log.y = y;
        log.z = md5;
        c.stroke();

        socket.emit('chat message', JSON.stringify(log));
    }
});

function drawPic(msg) {
    // var p = log.shift();
    // co.moveTo(p.x,p.y);
    
    var p = msg;
    var x = p.x,
        y = p.y;
    c.lineTo(x,y);
    c.stroke();
}




