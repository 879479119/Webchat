/**
 * Created by zi on 2016/5/24.
 */


define(["lib/jquery"],function ($) {
    console.log(233333);
    return {
        onlineCount:function (socket,callback) {
            socket.emit("query");
            socket.on("online count",function (c) {
                callback(c);
            });
        },
        a:10
    };
});