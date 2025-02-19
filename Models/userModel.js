const mongoose = require("mongoose");
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
        unique : true
    },
    mobile : {
        type : Number,
        required : true
    },
    pasword : {
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


const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;