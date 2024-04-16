const express=require('express');
const authRouter=express.Router();
const protectRoute=require('./authHelper')
const {loginfunction,getauthfun}=require('../controller/authController');

authRouter.route("/signup")
.get(protectRoute,getauthfun)

authRouter.route("/login")
.post(loginfunction)

module.exports=authRouter