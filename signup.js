const express=require('express');
const cookieparser=require('cookie-parser');

const app=express();
app.use(express.json());
app.listen(3000)
app.use(cookieparser());


const authRouter=require("./Routers/authRouter");
const userRouter=require("./Routers/userRouter");

app.use("/auth",authRouter);
app.use("/user",userRouter);
