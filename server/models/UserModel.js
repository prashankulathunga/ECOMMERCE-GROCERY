import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    cart: {type:Object, default:{}}
}, {minimize:false})

const User = mongoose.models.user || mongoose.model("user", UserSchema);

export default User;