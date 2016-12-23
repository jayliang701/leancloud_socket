/**
 * Created by Jay on 2016/3/8.
 */

exports.extend = function(App) {
    App.handleUserSession = function(req, res, next, error, auth) {
        var user = { isLogined:false };
        next(0, user);
    }
}