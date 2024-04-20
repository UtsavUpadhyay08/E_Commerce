const reviewModel = require("../models/reviewModel");

module.exports.getAllreview=async function getAllreview(req,res){
    try{
        const data=await reviewModel.find();
        res.json({
            message:"The reviews retrieved are",
            reviews:data
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}
module.exports.topreview=async function topreview(req,res){
    try{
        const data=await reviewModel.find().sort({
            rating:-1
        }).limit(req.params.id);
        res.json({
            message:"Top reviews are",
            data:data
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}
module.exports.getplanreview=async function getplanreview(req,res){
    try{
        const review=await reviewModel.findById(req.params.id);
        if(!review){
            return res.json({
                message:"Review not found"
            });
        }
        res.json({
            message:"Review found",
            review:review
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}
module.exports.createreview=function createreview(){};
module.exports.updatereview=function updatereview(){};
module.exports.deletereview=function deletereview(){};