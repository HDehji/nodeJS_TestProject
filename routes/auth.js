const express = require('express');
const router=express.Router();
const{check,validationResult}=require('express-validator');

//controller
const authController = require('./../controllers/authController');
//validator
const authValidator=require('./../validators/authValidator')

router.use((req,res,next)=>{
    if(req.isAuthenticated()){
        return res.redirect('/dashboard')
    }
    next();
})

router.post("/register",authValidator.register(),authController.register);
router.post("/login",authValidator.login(),authController.login);


module.exports=router;