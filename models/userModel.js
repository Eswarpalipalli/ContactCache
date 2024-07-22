import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username :{
        type : String,
        required : [true,"Please Provide the UserName"],
    },
    email :{
        type : String,
        required : [true,"Please Provide the Email"],
        unique : [true,"Email already Taken"],
    },
    password :{
        type:String,
        required :[true,"Please Provide a Password"],
    }
},{
    timestamps : true,
});

export default mongoose.model("User",userSchema);