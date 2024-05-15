let controller=require("./controller")
const User=require("./../models/user")
const passport=require('passport')
const{check,validationResult}=require('express-validator');


class dashboardController extends controller{

     async index(req,res,next){
      try {
         res.render('../views/dashboard.ejs')
      } catch (error) {
         
      }
    }
     


}


module.exports=new dashboardController;