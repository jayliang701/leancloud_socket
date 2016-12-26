var Setting = global.SETTING;
var Utils = require("magicfish_web/utils/Utils");
var WebSocketServer = require("../socket/WebSocketServer");

function renderIndexPage(req, res, output, user) {
    output({ connectedNumber:WebSocketServer.getConnectedNumber() });
}

function renderClientPage(req, res, output, user) {
    output({ url:Setting.site });
}

exports.getRouterMap = function() {
    return [
        { url: "/", view: "index", handle: renderIndexPage, needLogin:false },
        { url: "/index", view: "index", handle: renderIndexPage, needLogin:false },
        { url: "/client", view: "client", handle: renderClientPage, needLogin:false }
    ];
}
