/**
 * Created by Jay on 2016/12/22.
 */
var PORT = 3000;
var BufferHelper = require('bufferhelper');
var fs = require('fs');
var io = require('socket.io')(PORT);

var liveNum = 0;

io.on('connection', function(socket){
    liveNum ++;

    var conn = socket.request.connection;

    socket.info = {
        id: socket.id,
        ip: conn.remoteAddress,
        port: conn.remotePort,
        connectTime: Date.now()
    };

    //自定义数据包
    socket.sendAsBuffer = function(type, data) {
        //var buffer = new BufferHelper();
        data = data || {};
        if (typeof data == "object") {
            data = JSON.stringify(data);
        }
        /*
        args.forEach(function(arg, i) {
            if (typeof arg == "object") {
                arg = JSON.stringify(arg);
            }
            arg = String(arg);
            if (i < (args.length - 1)) {
                arg = "&=";
            }
            buffer.concat(new Buffer(String(data)));
        });
        */
        socket.emit(type, new Buffer(String(data)));
    };

    console.log(`client *${socket.id}* connected from ${socket.info.ip}:${socket.info.port}`);

    /* 向客户端推送消息 */
    //例如当客户端连接后，马上发送一个欢迎的消息
    socket.emit('welcome', { ip:socket.info.ip, port:socket.info.port });

    //例如定时发送消息给客户端
    socket.__timer = setInterval(function() {
        socket.emit('time_update', { time: Date.now() });
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

console.log('server startup on port: ' + PORT);