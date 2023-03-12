const mongoose = require('mongoose');
let postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    commentsId:[{
         type:mongoose.Types.ObjectId,
        ref:'comment'
    }]
})

let postModel = mongoose.model("post",postSchema)
module.exports = postModel