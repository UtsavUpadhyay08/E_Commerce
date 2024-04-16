const express=require('express');
const userRouter=express.Router();
const {getUser,updateUser,deleteUser,getAllUsers}=require("../controller/userController")
const {signup,login,isAuthorised,protectRoute}=require("../controller/authController")
userRouter.route("/:id")
.patch(updateUser)
.delete(deleteUser)

userRouter.route("/signup")
.post(signup)

userRouter.route("/login")
.post(login)

// app.use(protectRoute)
// userRouter.route("/profilepage")
// .get(getUser)

// app.use(isAuthorised["admin"])
// userRouter.route("")
// .get(getAllUsers)

module.exports=userRouter