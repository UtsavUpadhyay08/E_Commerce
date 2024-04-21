const multer = require('multer');
const userModel=require('../models/UserModel')

module.exports.getUser=async function getUser(req,res){
    try{
        // console.log(req.id);
        // console.log(req.role);
        // let user=await userModel.find();
        let user=await userModel.findById(req.id);
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
        let user=await userModel.findById(id);
        if(!user){
            res.json({
                message:"User Not found"
            });
            return;
        }
        for(let keys in req.body){
            user[keys]=req.body[keys];
        }
        // console.log(user);
        // await user.save();
        await userModel.findByIdAndUpdate(id,user);
        res.json({
            message:"Successfully updated",
            data:user
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
        let user=await userModel.findByIdAndDelete(id);
        if(!user){
            res.json({
                message:"User not found"
            });
            return;
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

module.exports.updateProfileImage=function updateProfileImage(req,res){
    res.json({
        message:"file uploaded successfully"
    });
}

//multer
const multerstorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"C:\\Users\\utsav\\Desktop\\Backend Development with express\\Learn\\server\\public\\images");
    },
    filename:function(req,file,cb){
        cb(null,`user-${Date.now()}.jpeg`);
    }
})
const filter=function(req,file,cb){
    if(file.mimetype.startsWith("image")){
        cb(null,true);
    }
    else{
        cb(new Error("Please upload image"),false);
    }
}
module.exports.upload=upload=multer({
    storage:multerstorage,
    fileFilter:filter
});
