const express=require('express');
const userRouter=express.Router();
const {getUser,updateUser,deleteUser,getAllUsers}=require("../controller/userController")
const {signup,login,isAuthorised,protectRoute,forgetPassword,resetPassword,logout}=require("../controller/authController")
const app=express()

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

userRouter.use(protectRoute);
userRouter.route("/profilepage")
.get(getUser)

userRouter.use(isAuthorised(["admin"]))
userRouter.route("")
.get(getAllUsers)

module.exports=userRouter