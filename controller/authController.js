const mongoose=require('mongoose');
const userSchema=require('../models/UserModel')
const jwt=require('jsonwebtoken');
const key=require('../secret');
const userModel=mongoose.model('userModel',userSchema);
const bcrypt=require('bcrypt');

module.exports.signup=async function signup(req,res){
    try{
        const user=await userModel.create(req.body);
        if(user){
            res.json({
                message:"User Created",
                data:user
            });
        }
        else{
            res.json({
                message:"Error while signing up"
            });
        }
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
}

module.exports.login=async function login(req,res){
    try{
        const data=req.body;
        if(data.email){
            const user=await userModel.findOne({"email":data.email});
            if(user){
                const isUser=await bcrypt.compare(data.password,user.password); 
                if(isUser){
                    let token=jwt.sign({uid:user._id},key);
                    // console.log(token);
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
        else{
            res.json({
                message:"Please enter the credentials"
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
}

module.exports.isAuthorised=function isAuthorised(roles){
    return function(req,res,next){
        if(roles.include(req.role)){
            next();
        }
        else{
            res.json({
                message:"Not allowed"
            })
        }
    }
}

module.exports.protectRoute=async function protectRoute(req,res,next){
    try{
        if(req.cookies.isLoggedin){
            const payload=jwt.verify(req.cookies.isLoggedin,key);
            if(payload){
                const user=await userModel.findById(payload.payload);
                req.role=user.role;
                req.id=user.id;
                next();
            }
            else{
                res.json({
                    message:"Not authenticated"
                });
            }
        }
        else{
            res.json({
                message:"Operation Not Allowed"
            });
        }
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
}
