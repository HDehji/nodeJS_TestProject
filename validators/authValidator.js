const{check}=require('express-validator');
const validator=require("./validator")

module.exports=new class authValidator extends validator{
    register(){
        return     [
            check('email','فرمت ایمیل صحیح نمی باشد').isEmail(),
            check('password','طول پسورد باید حداقل 5 کاراکتر باشد').isLength({min:5})
        ]
    }
    login(){
        return     [
            check('email','فرمت ایمیل صحیح نمی باشد').isEmail(),
        ]
    }
    }
