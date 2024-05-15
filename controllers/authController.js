let controller=require("./controller")
const User=require("./../models/user")
const passport=require('passport')
const{check,validationResult}=require('express-validator');


class authController extends controller{

   async loginForm(req,res,next){
      try {
         res.render('auth/login.ejs',{errors:req.flash('errors')})
      } catch (err) {
       next(err)  
      }
   }
   async registerForm(req,res,next){
      try {
         res.render('auth/register.ejs')
      } catch (err) {
       next(err)  
      }
   }

     async login(req,res,next){
        try {    
               const errors=validationResult(req);
               if(!errors.isEmpty()){
                  let myErrors=errors.array().map(err=>err.msg);
                  req.flash('errors',myErrors)
                  return res.render('auth/login.ejs',{errors:req.flash('errors')})
                 };
                 passport.authenticate('local.login',(err,user)=>{
                  if (!user) return res.send('عملیات ناموفق بود')
                  req.logIn(user,err=>{
                     return res.redirect('/dashboard')
                  })
                 })(req,res,next)
        } catch (err) {
           next(err)
        }
   
    }
    async register(req,res,next){
        try {    
               const errors=validationResult(req);
               if(!errors.isEmpty()){
                  let myErrors=errors.array().map(err=>err.msg);
                  req.flash('errors',myErrors)
                  return res.redirect('/auth/register')
               };
            passport.authenticate('local.register',{
               successRedirect:'/dashboard',
               failureRedirect:'/',
               failureFlash:true,
            })(req,res,next)
        } catch (err) {
           next(err)
        }
   
    }
     


}


module.exports=new authController;