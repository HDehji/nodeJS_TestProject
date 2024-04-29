let controller=require("./controller")
const User=require("./../models/user")
const{check,validationResult}=require('express-validator');


class userController extends controller{
    async getAllUser(req,res,next){
        
        try {    
            let users=await User.find({});
            res.status(200).json({
            data:users,
            success:true
             });
            
        } catch (err) {
            next(err)
        }
    
     }

    async getOneUsr(req,res,next){
        try {
            let user=await User.findById(req.params.id);
            // if (!user) {
            //     this.error("چنین کاربری وجود ندارد",404)
            // }
            res.status(200).json({
            data:user,
            success:true
            })}
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
            return res.status(422).json({errors:errors.array()});
        };
    
        let newUser=new User({
            first_name:req.body.first_name,
            email:req.body.email,
            password:req.body.password,        
        });
        await newUser.save();
        res.status(200).json({
            data:"یوزر جدید با موفقعیت ثبت شد",
            success:true
        });
        }
         catch (err) {
            next(err)
        }
    }
    async deleteUser(req,res,next){
       try {
        await User.deleteOne({_id:req.params.id});
        res.status(200).json({
            data:"یوزر با موفقعیت حذف شد",
            success:true
        });
       } catch (err) {
        next(err)
       }
     }

    async updateUser(req,res,next){
        try {
            await User.updateMany({_id:req.params.id},{$set:req.body});
          res.status(200).json({
            data:"یوزر با موفقعیت اپدیت شد",
            success:true
        });
        } catch (err) {
            next(errr)
        }
     }

}


module.exports=new userController;