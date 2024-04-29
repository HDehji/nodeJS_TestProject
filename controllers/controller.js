const autoBind = require("auto-bind");

class controller{
    constructor(){
        autoBind(this);
    }
    error(message,status=500){
        let err=new Error(message);
        err.status=status;
        throw err;
    }

}
module.exports= controller;