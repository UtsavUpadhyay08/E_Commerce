const planModel = require("../models/planModel")

module.exports.getAllPLans=async function getAllPLans(req,res){
    try{
        const data=await planModel.find();
        res.json({
            message:"The plans retrieved are",
            plans:data
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports.getplan=async function getplan(req,res){
    try{
        const plan=await planModel.findById(req.params.id);
        if(!plan){
            return res.json({
                message:"Plan not found"
            });
        }
        res.json({
            message:"PLan found",
            plan:plan
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports.createPlan=async function createPlan(req,res){
    try{
        const new_plan=await planModel.create(req.body);
        res.json({
            message:"Plan Created",
            data:new_plan
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports.updatePlan=async function updatePlan(req,res){
    try{
        const new_plan=await planModel.findById(req.params.id);
        if(!new_plan){
            return res.json({
                message:"Plan Not FOund"
            });
        }
        for(let keys in req.body){
            new_plan[keys]=req.body[keys];
        }
        await new_plan.save();
        res.json({
            message:"Plan Created",
            data:new_plan
        });
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
}

module.exports.deletePlan=async function deletePlan(req,res){
    try{
        const new_plan=await planModel.findByIdAndDelete(req.params.id);
        res.json({
            message:"Plan Deleted Successfully",
            data:new_plan
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports.topplan=async function topplan(req,res){
    try{
        const data=await planModel.find().sort({
            ratingsAverage:-1
        }).limit(req.params.id);
        res.json({
            message:"Top plans are",
            data:data
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}