/**
 * Created by Jay on 14-5-4.
 */
module.exports = {

    env:"localdev",

    host:"0.0.0.0",
    port:3000,

    net: {
        http: {
            ip:"127.0.0.1",
            port:3000
        }
    },

    model: {
    },

    session: {
    },

    site:"http://localhost:3000/",
    siteName:"leancloud socket demo",

    cdn:{
        res:"",
        flash:"flash"
    }
};
