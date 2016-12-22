/**
 * Created by Jay on 2016/12/22.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var liveNum = 0;

app.get('/', function(req, res){
    res.end(`current connection number: ${liveNum}`);
});

io.on('connection', function(socket){
    liveNum ++;

    var conn = socket.request.connection;

    socket.info = {
        id: socket.id,
        ip: conn.remoteAddress,
        port: conn.remotePort,
        connectTime: Date.now()
    };

    console.log(`client *${socket.id}* connected from ${socket.info.ip}:${socket.info.port}`);

    /* 向客户端推送消息 */
    //例如当客户端连接后，马上发送一个欢迎的消息
    socket.emit('welcome', { ip:socket.info.ip, port:socket.info.port });

    //例如定时发送消息给客户端
    socket.__timer = setInterval(function() {
        socket.emit('time_update', { time:Date.now() });
    }, 3000);

    //////////////////////

    /* 收到客户端推送的消息，执行相关逻辑，自定义 */
    socket.on('say', function(data) {
        console.log(`client *${socket.id}* say: ${data.msg}`);
    });
    socket.on('myevent', function(data) {
        console.log(`client *${socket.id}* send myevent ---> `, data);
    });
    //////////////////////

    socket.once("disconnect", function () {
        liveNum --;
        clearInterval(socket.__timer);
        socket.__timer = undefined;
        console.log("client *" + socket.id + "* disconnected...");
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});