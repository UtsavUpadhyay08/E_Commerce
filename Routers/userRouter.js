const express=require('express');
const userRouter=express.Router();
const {getUser,updateUser,deleteUser,getAllUsers}=require("../controller/userController")

userRouter.route("/:id")
.patch(updateUser)
.delete(deleteUser)

app.use(protectRoute)
userRouter.route("/profilepage")
.get(getUser)

app.use(isAuthorised["admin"])
userRouter.route("")
.get(getAllUsers)

module.exports=userRouter