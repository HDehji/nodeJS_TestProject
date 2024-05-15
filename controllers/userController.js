let controller=require("./controller")
const User=require("./../models/user")
const{validationResult}=require('express-validator');
const bcrypt = require('bcryptjs');


class userController extends controller{
    async getAllUser(req,res,next){
        
        try {    
            let users=await User.find({});
             res.render('users.ejs',{users,title:"همه کاربران",errors:req.flash('errors'),message:req.flash('message')})
        } catch (err) {
            next(err)
        }
    
     }

    async getOneUsr(req,res,next){
        try {
            let user=await User.findById(req.params.id);
            res.render('user.ejs',{user})
        }
          catch (err) {
            err.message="چنین کاربری وجود ندارد"
            err.status=404
            next(err)
        }
    }
       
    async createUser(req,res,next){
        try {
            const errors=validationResult(req);
        if(!errors.isEmpty()){
            req.flash('errors',errors.array())
            return res.redirect('/user');
        };
    
        let newUser=new User({
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password,8),        
        });
        await newUser.save();
        req.flash('message','کاربر با موفقعیت ثبت شد');
        res.redirect('/user')
        }
         catch (err) {
            next(err)
        }
    }
    async deleteUser(req,res,next){
       try {
        await User.deleteOne({_id:req.params.id});
        req.flash('message','کاربر با موفقعیت حذف شد')
        res.redirect('/user')
       } catch (err) {
        next(err)
       }
     }

    async updateUser(req,res,next){
        try {
            await User.updateMany({_id:req.params.id},{$set:req.body});
            req.flash('message','کاربر با موفقعیت اپدیت شد');
         res.redirect('/user')
        } catch (err) {
            next(err)
        }
     }

}


module.exports=new userController;