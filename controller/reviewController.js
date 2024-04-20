const planModel = require("../models/planModel");
const reviewModel = require("../models/reviewModel");
const { changeplan } = require("./authController");

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
module.exports.createreview=async function createreview(req,res){
    try{
        const new_review=await reviewModel.create(req.body);
        const plan=await planModel.findById(req.params.plan);
        if(!plan){
            return res.json({
                message:"No such plan"
            });
        }
        changeplan(req.params.plan,new_review.rating,-1);
        res.json({
            message:"Review Created",
            data:new_review
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}
module.exports.updatereview=async function updatereview(req,res){
    try{
        const new_review=await reviewModel.findById(req.params.id);
        if(!new_review){
            return res.json({
                message:"Review Not FOund"
            });
        }
        let rating=new_review.rating;
        for(let keys in req.body){
            new_plan[keys]=req.body[keys];
        }
        if(new_plan.rating!=rating) changeplan(new_review.plan,new_plan.rating,rating); 
        await new_plan.save();
        res.json({
            message:"Review Created",
            data:new_review
        });
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
}
module.exports.deletereview=async function deletereview(req,res){
    try{
        const new_review=await reviewModel.findByIdAndDelete(req.params.id);
        res.json({
            message:"Plan Deleted Successfully",
            data:new_review
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}