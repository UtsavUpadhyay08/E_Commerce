const mongoose=require('mongoose');
const {url}=require("../secret");

mongoose.connect(url)
.then(()=>console.log("Plan Database Connected"))
.catch((err)=>{
    console.log(err);
});

const planSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxLength:[20,"Name should not exceed 20 characters"]
    },
    duration:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    ratingsAverage:{
        type:Number,
        default:0
    },
    totalratings:{
        type:Number,
        default:0
    },
    discount:{
        type:Number,
        required:true,
        validate:[function(){
            return this.discount<100;
        },"Discount should be less than 100%"]
    }
})

const planModel=new mongoose.model("planModel",planSchema);

module.exports=planModel;