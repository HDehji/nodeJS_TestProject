const express = require('express');
const router=express.Router();

router.use("/user",require("./users"))
router.all(("/*"),(req,res,next)=>{
    try {
        let err=new Error('چنین صفحه ای یافت نشد');
        err.status=404;
        throw err;
    } catch (err) {
        next(err);
    }
})
router.use((err,req,res,next)=>{
    const code=err.status || 500;
    const message=err.message||"";
    const stack=err.stack||"";
    return res.json({massage:message,status_code:code})
})

module.exports=router;
