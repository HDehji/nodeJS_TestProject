import autoBind from 'auto-bind';

class controller{
    constructor(){
        autoBind(this);
    }

}
module.exports= controller;