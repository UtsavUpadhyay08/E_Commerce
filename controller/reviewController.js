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
        const review=await reviewModel.find();
        review.filter(review=>review.plan._id==req.params.id);
        if(!review){
            return res.json({
                message:"Review not found"
            });
        }
        res.json({
            message:"Reviews found",
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
                message:"No such review"
            });
        }
        changeplan(req.params.plan,new_review.rating,0);
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
        let val=1;
        // console.log(req.body);
        if(req.body.rating && new_review.rating!=req.body.rating) val=changeplan(new_review.plan,req.body.rating,new_review.rating);
        // console.log(req.body.rating,new_review.rating);
        if(val==0){
            return res.json({
                message:"Review not found"
            });
        }
        for(let keys in req.body){
            new_review[keys]=req.body[keys];
        }
        // new_review["plan"]=req.params.id;
        await new_review.save();
        const data=await reviewModel.findById(req.params.id);
        res.json({
            message:"Review Created",
            data:data
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
            message:"Review Deleted Successfully",
            data:new_review
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}