const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id:Number,
    first_name:String,
    last_name:String,
    email:String,
    gender:String,
    avatar:String,
    domain:String,
    available:Boolean,

},{
    timestamps:true
})

const users = mongoose.model("users",userSchema);

module.exports = users;