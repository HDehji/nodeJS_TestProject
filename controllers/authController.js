let controller=require("./controller")
const User=require("./../models/user")
const{check,validationResult}=require('express-validator');


class authController extends controller{

     async login(req,res,next){
        try {    
               const errors=validationResult(req);
               if(!errors.isEmpty()){
                  let myErrors=errors.array().map(err=>err.msg);
                  return res.status(422).json({errors:myErrors});
                 };
        } catch (err) {
           next(err)
        }
   
    }
    async register(req,res,next){
        try {    
               const errors=validationResult(req);
               if(!errors.isEmpty()){
                  let myErrors=errors.array().map(err=>err.msg);
                  return res.status(422).json({errors:myErrors});
               };
        } catch (err) {
           next(err)
        }
   
    }
     


}


module.exports=new authController;