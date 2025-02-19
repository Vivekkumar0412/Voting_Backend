const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hiiii")
})


app.listen(PORT,()=>{
    console.log(`Backend is live on http://localhost:${PORT}`)
})