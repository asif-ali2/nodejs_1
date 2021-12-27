require("dotenv").config();
const express = require("express");
const Joi = require("joi");
const app = express();
const port =process.env.PORT || 3000;
const userRouter = require("./routes/user.router");

app.use(express.json())

app.use('/api/users',userRouter);

// console.log(process.env.MY_NAME);


app.listen(port,()=>{
    console.log("Connecting at port ",port);
});