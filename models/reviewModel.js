const mongoose=require('mongoose');
const {url}=require("../secret");

mongoose.connect(url)
.then(()=>console.log("Review Database Connected"))
.catch((err)=>{
    console.log(err);
});

const reviewSchema=new mongoose.Schema({
    review:{
        type:String,
        required:[true,"Review is required"],
    },
    rating:{
        type:Number,
        required:[true,"Rating is required and should be in range 1-10"],
        max:10,
        min:1
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"userModel",
        required:[true,"Review must belong to user"]
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        ref:"planModel",
        required:[true,"Review must belong to plan"]
    }
});

reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:"user",
        select:"name profileImg"
    }).populate("plan");

    next();
})

const reviewModel=mongoose.model("reviewModel",reviewSchema);

module.exports=reviewModel;