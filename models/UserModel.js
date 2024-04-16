const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const url="mongodb+srv://utsavup2004:EWMYii6V5B58RGc2@cluster0.kjwg5z6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(url)
.then(()=>console.log("Database Connected"))
.catch((err)=>{
    console.log(err);
});

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email));
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmpassword:{
        type:String,
        required:true,
        minLength:8,
        validate:function(){
            return this.password==this.confirmpassword;
        }
    },
    role:{
        type:String,
        enum:["admin","user","deliveryboy"]
    },
    profileImg:{
        type:String,
        default:"../img/default.jpeg"
    }
})


module.exports=userSchema


userSchema.pre('save',function(){
    this.confirmpassword=undefined;
})
userSchema.pre('save',async function(){
    const salt=await bcrypt.genSalt();
    const hashed=await bcrypt.hash(this.password,salt);
    this.password=hashed;
    // console.log(hashed);
})
