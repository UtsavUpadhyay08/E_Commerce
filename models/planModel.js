const mongoose=require('mongoose');

const url="mongodb+srv://utsavup2004:EWMYii6V5B58RGc2@cluster0.kjwg5z6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

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
        type:Number
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