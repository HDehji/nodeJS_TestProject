let controller=require("./controller")
const User=require("./../models/user")
const{check,validationResult}=require('express-validator');


class userController{
    async getAllUser(req,res){
        let users=await User.find({});
        res.status(200).json({
            data:users,
            success:true
        });
     }

    async getOneUsr(req,res){
        let user=await User.findById(req.params.id);
        res.status(200).json({
        data:user,
        success:true
      })}
    async createUser(req,res){
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
    async deleteUser(req,res){
        await User.deleteOne({_id:req.params.id});
        res.status(200).json({
            data:"یوزر با موفقعیت حذف شد",
            success:true
        });
     }

    async updateUser(req,res){
        await User.updateMany({_id:req.params.id},{$set:req.body});
          res.status(200).json({
            data:"یوزر با موفقعیت اپدیت شد",
            success:true
        });
     }

}


module.exports=new userController;