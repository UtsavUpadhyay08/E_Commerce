const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const token=require("crypto-token");
const {url,key}=require("../secret");

mongoose.connect(url)
.then(()=>console.log("User Database Connected"))
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
        enum:["admin","user","deliveryboy"],
        default:"user"
    },
    profileImg:{
        type:String,
        default:"../img/default.jpeg"
    },
    resetToken:String
})

userSchema.pre('save',function(){
    this.confirmpassword=undefined;
})
userSchema.pre('save',async function(){
    const salt=await bcrypt.genSalt();
    const hashed=await bcrypt.hash(this.password,salt);
    this.password=hashed;
    // console.log(hashed);
})

userSchema.methods.createResetToken=async function(){
    let reset_token=await token(32);
    this.resetToken=reset_token;
    // console.log(reset_token);
    return reset_token;
}

userSchema.methods.resetPasswordHandler=function(password,confirmpassword){
    this.password=password;
    this.confirmpassword=confirmpassword;
    this.resetToken=this.createResetToken();
    // console.log(this)
    // console.log(reset_token);
    // return reset_token;
}

const userModel=mongoose.model('userModel',userSchema);

module.exports=userModel