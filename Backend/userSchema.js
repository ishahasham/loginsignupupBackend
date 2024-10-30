import mongoose from "mongoose"

// User schema and model
const userSchema= mongoose.Schema({
    name:String,
    user:String,
    password:String
})
const userModel = mongoose.model("User", userSchema)
export default userModel