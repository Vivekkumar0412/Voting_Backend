const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const testSchema = new mongoose.Schema({
    name : {
        type : String
    },
    password : {
        type : String
    }
});

testSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    console.log(this.password,"password")
    return next();
})


const testModel = mongoose.model("testModel",testSchema);

module.exports = testModel;