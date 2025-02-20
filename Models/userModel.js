const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    adharNumber : {
        type : Number,
        required : true,
        // unique : true
    },
    mobile : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required :true
    },
    role : {
        type : String,
        enum : ["voter","admin"],
        default : "voter"
    },
    isVoted : {
        type : Boolean,
        default : false
    }
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    try {
        // console.log("inside preee")
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        console.log(this.password,"password")
        return next();
    } catch (error) {
        return next(error);
    }
});


userSchema.methods.comparePassword = async function(userPassword){
    try {
        const isMatch = await bcrypt.compare(userPassword,this.password);
        console.log(userPassword,"userPassword in pree")
        return isMatch;
    } catch (error) {
        resizeBy.status(404).json({msg : "password did not match !!!" })
    }
}


const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;