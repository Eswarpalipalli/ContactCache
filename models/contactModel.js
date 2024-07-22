import mongoose, { mongo } from "mongoose";

const contactSchema = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User",
    },
    name :{
        type : String,
        required : [true,"Please add the contact Name!"],
    },
    phone :{
        type : String,
        required : [true,"Please add the contact Number!"],
    },
    email :{
        type : String   ,
        required : [true,"Please add the contact Email!"],
    },
},{
    timestamps : true,
});
export default mongoose.model("Contact",contactSchema);