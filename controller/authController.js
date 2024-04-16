const mongoose=require('mongoose');
const userSchema=require('../models/UserModel')
const jwt=require('jsonwebtoken');
const key=require('../secret');
const userModel=mongoose.model('userModel',userSchema);
const bcrypt=require('bcrypt');

module.exports.loginfunction=async function loginfunction(req,res){
    const data=req.body;
    if(data.email){
        try{
            const user=await userModel.findOne({"email":data.email});
            if(user){
                const isUser=await bcrypt.compare(data.password,user.password); 
                if(isUser){
                    let token=jwt.sign({uid:user._id},key);
                    console.log(token);
                    res.cookie("isLoggedin",token,{httpOnly:true,secure:true});
                    res.json({
                        message:"User Found",
                        user:user
                    });
                }
                else{
                    res.json({
                        message:"Invalid Credentials"
                    });
                }
            }
            else{
                res.json({
                    message:"Invalid Credentials"
                })
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
            message:"Please enter the credentials"
        })
    }
}

module.exports.getauthfun=async function getauthfun(req,res){
    const data=await userModel.find({__v:0});
    res.json({
        message:"The found user is",
        data:data
    });
    // let path=__dirname.split('\\');
    // let base="";
    // for(let i=0;i<path.length-1;i++){
    //     base+=path[i];
    //     base+="\\";
    // }
    // console.log(base);
    // res.sendFile("/public/index.html",{root:base});
}




// authRouter.route("/setCookies")
// .get(setCookies);

// authRouter.route("/getCookies")
// .get(getCookies);

// function setCookies(req,res){
//     res.cookie("isLoggedin","true",{maxAge:1000*1000,httpOnly:true,secure:true});
//     res.cookie("isPrime","true54336578986",{maxAge:1000*1000,httpOnly:true,secure:true});
//     res.send({
//         message:"Cookies set"
//     });
// }

// function getCookies(req,res){
//     res.send({
//         message:"Cookies set",
//         cookies:req.cookies
//     });
// }