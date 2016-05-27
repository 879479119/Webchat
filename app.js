var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var crypto  =require('crypto');
var jade = require("jade");
var mysql = require("mysql");
var bodyParser = require('body-parser');

var conn = mysql.createConnection({
    user:'root',
    password:''
});

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.get('/room', function(req, res){
    var room = req.query.id;
    console.log(getCookie(req.headers.cookie,"a"));
    res.render('room',{id:room,enter:"room"});
});

app.get('/', function(req, res){
    res.setHeader("set-cookie",'sid=0;HttpOnly');
    res.sendFile('index.html');
});

app.post('/login',function (req, res) {
    var name = req.body.name;
    var password = req.body.password;
    console.log(name,password);
    logCheck(name,password,res,function (name,password,res) {
        var hash = crypto.createHash('MD5');
        var md5 = hash.update(name+password+Date.now());
        var sid = md5.digest('hex');
        res.setHeader("set-cookie",'sid='+sid+';HttpOnly');
        res.redirect("/");
    });

});

io.on("connection",function (socket){
    socket.on("query",function (){
        socket.emit("online count","10");
    });

    socket.on("join",function (num) {
        var room_num = "room"+num;
        socket.join(room_num);
        socket.emit("join_echo","mm");
        console.log(socket.id);
    });
});

function getCookie(cookie,name){
    var arr = cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    return arr != null ? decodeURI(arr[2]) : null;
}

function logCheck(name, password, res, callback) {
    conn.connect();
    conn.query("use mydata");
    conn.query("select * from user_data where name = '"+name+"' and password = '"+password+"'",function (err, result) {
        console.log(result[0].id);
        if(err){
            console.log(err);
            return false;
        }else if(result != undefined){
            callback (name,password,res);
        }
        conn.end();
    });
}

io.on("disconnect",function () {
    console.log("over");
});

app.set('port', process.env.PORT || 3000);

var server = http.listen(app.get('port'), function() {
    console.log('start at port:' + server.address().port);
});