const express = require('express');
const router=express.Router();

router.get('/',(req,res)=>{res.send('Welcome')})
router.use("/user",require("./users"));
router.use("/auth",require("./auth"));
router.use('/dashboard',require('./dashboard'));
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
router.all(("/*"),(req,res,next)=>{
    try {
        let err=new Error('چنین صفحه ای یافت نشد');
        err.status=404;
        throw err;
    } catch (err) { 
        next(err);
    }
});
router.use((err,req,res,next)=>{
    const code=err.status || 500;
    const message=err.message||"";
    const stack=err.stack||"";
    return res.json({massage:message,status_code:code})
})

module.exports=router;
