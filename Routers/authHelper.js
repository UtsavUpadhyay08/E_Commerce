const jwt=require('jsonwebtoken');
const key=require('../secret');

function protectRoute(req,res,next){
    if(req.cookies.isLoggedin){
        try{
            const decoded=jwt.verify(req.cookies.isLoggedin,key);
            if(decoded){
                next();
            }
            else{
                res.json({
                    message:"Not authenticated"
                });
            }
        }
        catch(err){
            res.json({
                message:err.message
            });
        }
    }
    else{
        res.json({
            message:"Operation Not Allowed"
        });
    }
}

module.exports=protectRoute