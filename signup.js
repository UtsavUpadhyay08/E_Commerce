const express=require('express');
const cookieparser=require('cookie-parser');

const app=express();
app.use(express.json());
app.listen(3000)
app.use(cookieparser());

// const planModel=require("./models/planModel")

const userRouter=require("./Routers/userRouter");
const planRouter = require('./Routers/planRouter');

app.use("/user",userRouter);
app.use("/plan",planRouter);