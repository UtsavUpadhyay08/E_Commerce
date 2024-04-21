const express=require('express');
const multer = require('multer');
const userRouter=express.Router();
const {getUser,updateUser,deleteUser,getAllUsers, updateProfileImage}=require("../controller/userController")
const {signup,login,isAuthorised,protectRoute,forgetPassword,resetPassword,logout}=require("../controller/authController")
// const app=express()

userRouter.route("/:id")
.patch(updateUser)
.delete(deleteUser)

userRouter.route("/signup")
.post(signup)

userRouter.route("/login")
.post(login)

userRouter.route("/logout")
.get(logout)

userRouter.route("/forgetPassword")
.post(forgetPassword)

userRouter.route("/resetPassword/:token")
.post(resetPassword)

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
const upload=multer({
    storage:multerstorage,
    fileFilter:filter
});
userRouter.post("/uploadImage",upload.single('photo'),updateProfileImage);
userRouter.get("/uploadImage",function(req,res){
    res.sendFile("C:\\Users\\utsav\\Desktop\\Backend Development with express\\Learn\\server\\public\\upload.html");
});

userRouter.use(protectRoute);
userRouter.route("/profilepage")
.get(getUser)

userRouter.use(isAuthorised(["admin"]))
userRouter.route("")
.get(getAllUsers)

module.exports=userRouter