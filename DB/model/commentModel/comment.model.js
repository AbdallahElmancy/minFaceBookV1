const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    desc:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
})

const commentModel = mongoose.model('comment',commentSchema)
module.exports = commentModel