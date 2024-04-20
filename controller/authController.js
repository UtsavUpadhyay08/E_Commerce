const mongoose=require('mongoose');
const userModel=require('../models/UserModel')
const jwt=require('jsonwebtoken');
const {key}=require('../secret');
const bcrypt=require('bcrypt');
const planModel = require('../models/planModel');

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
        if(roles.includes(req.role)){
            next();
        }
        else{
            res.status(401).json({
                message:"Not allowed"
            })
        }
    }
}

module.exports.protectRoute=async function protectRoute(req,res,next){
    try{
        if(req.cookies.isLoggedin){
            const payload=jwt.verify(req.cookies.isLoggedin,key);
            // console.log(payload);
            if(payload){
                const user=await userModel.findById(payload.uid);
                // console.log(user);
                req.role=user.role;
                req.id=user.id;
                // console.log(req);
                // console.log(user);
                return next();
                
                // res.json({
                //     message:"Not authenticated"
                // });
            }
            else{
                res.json({
                    message:"Not authenticated"
                });
            }
        }
        else{
            const client=req.get["User-Agent"];
            if(client.includes("Mozilla")){
                return res.redirect("/login");
            }
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

module.exports.forgetPassword=async function forgetPasword(req,res){
    try{
        // console.log(req.body)
        let user=await userModel.findOne({email:req.body.email});
        // console.log(user);
        if(!user){
            res.json({
                message:"User Not Found"
            });
            return;
        }
        const new_token=await user.createResetToken();
        const new_link=`${req.protocol}://${req.headers.host}/resetPassword/${new_token}`;
        // await user.save();
        // console.log(new_token);
        res.json({
            message:"New link generated",
            link:new_link
        });
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
}

module.exports.resetPassword=async function resetPassword(req,res){
    try{
        let user=await userModel.findOne({resetToken:req.params.token});
        if(!user){
            res.json({
                message:"Invalid User Link"
            });
            return;
        }
        await user.resetPasswordHandle(req.body.password,req.body.confirmpassword);
        // await user.save();
        res.json({
            message:"New Password saved",
            data:user
        });
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports.logout=async function logout(req,res){
    try{
        res.cookie("isLoggedin",{},{maxAge:0});
        res.json({
            message:"User logged out"
        });
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
}

module.exports.changeplan=async function changeplan(plan_id,incr_rating,decr_rating){
    const plan=await planModel.findById(plan_id);
    if(!plan){
        return 0;
    }
    let new_rating = plan.ratingsAverage,totalratings=plan.totalratings;
    // console.log(new_rating,totalratings,incr_rating,decr_rating);
    new_rating*=totalratings;
    new_rating+=incr_rating;
    new_rating-=decr_rating;
    if(decr_rating==0 || totalratings==0) totalratings++;
    new_rating=(new_rating/totalratings);
    plan.ratingsAverage=new_rating;
    plan.totalratings=totalratings;
    // console.log(plan);
    await plan.save();
    return 1;
}