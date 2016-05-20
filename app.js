var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var crypto  =require('crypto');

app.use(express.static(__dirname));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){

  var date = Date.now().toString();
  hash = crypto.createHash('md5');
  hash.update(date);

  io.emit('md5', hash.digest('hex'));
    
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('keydown', function(msg){
    io.emit('keydown', msg);
  });

  socket.on('keyup', function(msg){
    io.emit('keyup', msg);
  });

});

app.set('port', process.env.PORT || 3000);

var server = http.listen(app.get('port'), function() {
  console.log('start at port:' + server.address().port);
});