const express=require('express');
const cookieparser=require('cookie-parser');

const app=express();
app.use(express.json());
app.listen(3000)
app.use(cookieparser());

const userRouter = require("./Routers/userRouter");
const planRouter = require('./Routers/planRouter');
const reviewRouter = require('./Routers/reviewRouter');
const bookingRouter = require('./Routers/bookingRouter');

app.use("/user",userRouter);
app.use("/plan",planRouter);
app.use("/review",reviewRouter);
app.use("/booking",bookingRouter);