const{check}=require('express-validator');
const validator=require("./validator")

module.exports=new class userValidator extends validator{
    handle(){
        return     [
            check('email','فرمت ایمیل صحیح نمی باشد').isEmail(),
            check('password','طول پسورد باید حداقل 5 کاراکتر باشد').isLength({min:5})
        ]
    }
    }
