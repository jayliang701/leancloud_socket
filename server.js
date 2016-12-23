/**
 * Created by Jay on 2016/12/22.
 */

var Utils = require("magicfish_web/utils/Utils");
var App = require("magicfish_web/App");
var WebSocketServer = require("./server/socket/WebSocketServer");
var app = new App();
global.VARS.env = process.env.env || global.VARS.env;

var Setting = global.SETTING;

app.addTask(function(cb) {
    var Model = require("magicfish_web/model/Model");
    Model.init(Setting.model,
        function() {
            cb();
        });
});

app.addTask(function(cb) {
    var webApp = require("magicfish_web/web/WebApp").start(Setting, function(webApp) {
        WebSocketServer.init(webApp.$server);
        cb();
    });
    require("./server/WebAppExt").extend(webApp);
});

app.run();