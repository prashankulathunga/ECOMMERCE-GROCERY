import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type:String, require:true},
    email: {type:String, require:true, unique:true},
    password: {type:String, require:true},
    cart: {type:Object, default:{}}
})

const User = mongoose.models.user || mongoose.model("user", UserSchema);

export default User;