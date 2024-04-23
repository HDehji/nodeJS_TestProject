const express = require('express');
const router=express.Router();
const User=require("./../models/user")
const{check,validationResult}=require('express-validator');


router.get("/",async function(req,res){
    let users=await User.find({});
    res.status(200).json({
        data:users,
        success:true
    })
});

router.post("/",[
    check('email','فرمت ایمیل صحیح نمی باشد').isEmail(),
    check('password','طول پسورد باید حداقل 5 کاراکتر باشد').isLength({min:5})
],async function(req,res){
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()})
    };

    let newUser=new User({
        first_name:req.body.first_name,
        email:req.body.email,
        password:req.body.password,        
    });
    await newUser.save();
    res.status(200).json({
        data:"یوزر جدید با موفقعت ثبت شد",
        success:true
    })
});

router.put("")

module.exports=router;