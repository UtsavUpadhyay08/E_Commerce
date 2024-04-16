const mongoose=require("mongoose");
const userSchema=require('../models/UserModel')
const userModel=mongoose.model('userModel',userSchema);

module.exports.getuser=async function getuser(req,res){
    try{
        let user=await userModel.findById(req.params.id);
        if(!user){
            res.json({
                message:"User Not Found"
            });
        }
        res.json({
            message:"User Found",
            data:user
        });
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
}

module.exports.updateUser=async function updateUser(req,res){
    try{
        let id=req.params.id;
        let user=await findById(id);
        for(let keys in req.body){
            if(user[keys]){
                user[keys]=req.body[keys];
            }
        }
        let data=await user.save();
        res.json({
            message:"Successfully updated",
            data:data
        });
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
}

module.exports.deleteUser=async function deleteUser(req,res){
    try{
        let id=req.params.id;
        let user=await findByIdAndDelete(id);
        if(!user){
            res.json({
                message:"User not found"
            });
        }
        res.json({
            message:"Deleted User",
            data:user
        });
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
}

module.exports.getAllUsers=async function getAllUsers(req,res){
    let users=await userModel.find();
    res.json({
        message:"Users found are",
        data:users
    });   
}