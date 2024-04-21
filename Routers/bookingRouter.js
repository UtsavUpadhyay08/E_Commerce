const express=require("express");
const { protectRoute } = require("../controller/authController");
const { createsession } = require("../controller/bookingController");
const bookingRouter=express.Router();

bookingRouter.post("/createsession",protectRoute,createsession);
bookingRouter.get("/createsession",function(req,res){
    const path="C:\\Users\\utsav\\Desktop\\Backend Development with express\\Learn\\server\\public\\checkout.html";
    res.sendFile(path);
});

module.exports=bookingRouter