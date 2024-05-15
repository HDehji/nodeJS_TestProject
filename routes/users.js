const express = require('express');
const router=express.Router();
const{check,validationResult}=require('express-validator');

//controller
const userController = require('./../controllers/userController');
//validator
const userValidator=require('./../validators/userValidator')

router.get("/",userController.getAllUser);
router.post("/",userValidator.handle(),userController.createUser);
router.get("/:id",userController.getOneUsr);
router.delete("/:id",userController.deleteUser)
router.put("/:id",userController.updateUser)


module.exports=router;