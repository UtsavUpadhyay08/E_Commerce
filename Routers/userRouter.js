const express=require('express');
const userRouter=express.Router();
const {getUser,updateUser,deleteUser,getAllUsers, updateProfileImage, upload}=require("../controller/userController")
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