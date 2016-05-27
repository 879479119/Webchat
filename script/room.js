/**
 * Created by zi on 2016/5/26.
 */

require(["lib/jquery"],function ($) {
    var socket = io();
    $("#submit").click(function () {
        
    });
    
    socket.emit("join");
    socket.on("join_echo",function (msg) {
        $("#name").html(msg);
    });
    

    $("#close").click(function () {
        
    });
});

