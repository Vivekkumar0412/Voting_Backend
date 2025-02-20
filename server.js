const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Voting_Backend")
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
const userRouter = require("./Routes/userRouter");

app.get("/",(req,res)=>{
    res.send("hiiii")
})
app.use("/user",userRouter);


app.listen(PORT,()=>{
    console.log(`Backend is live on http://localhost:${PORT}`)
})