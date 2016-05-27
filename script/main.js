/**
 * @author: Wanlei
 * @create: 2016.5.24
 */


require(["lib/jquery","module/state_query"],function ($,query) {
    var obj = {
        init:function () {
            var _self = this;
            var socket = io();
            query.onlineCount(socket,function (res) {
                $("#online-count").html(res);
                _self._refresh(parseInt(res));
            });
            _self._enter();
        },
        _refresh:function (num) {
            var n = 1;
            var add = "";
            while(n <= num){
                add += "<li><button data-room='room?id="+n+"'>房间"+n+"</button></li>";
                n ++;
            }
            $(".room-list").empty().append(add);
        },
        _enter:function () {
            $(".room-list").on("click","button",null,function () {
                window.location += $(this).data("room");
            })
        }
    };
    obj.init();
});