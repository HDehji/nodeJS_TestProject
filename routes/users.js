const express = require('express');
const router=express.Router();
const User=require("./../models/user")
const{check,validationResult}=require('express-validator');

//controller
const userController = require('./../controllers/userController');

router.get("/",userController.getAllUser);

router.post("/",[
    check('email','فرمت ایمیل صحیح نمی باشد').isEmail(),
    check('password','طول پسورد باید حداقل 5 کاراکتر باشد').isLength({min:5})
],userController.createUser);


router.get("/:id",userController.getOneUsr);

router.delete("/:id",userController.deleteUser)

router.put("/:id",userController.updateUser)

module.exports=router;