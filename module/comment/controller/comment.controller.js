
const userModel = require('../../../DB/model/userModel/userRegister.model');
const postModel = require("../../../DB/model/postModel/post.model")
const commentModel = require("../../../DB/model/commentModel/comment.model")
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=require("http-status-codes")



let addComment = async(req,res)=>{
    try {
        let {desc,userId,postId} = req.body
        let isFound = await userModel.findOne({_id:userId})
        if(!isFound){
            res.status(StatusCodes.BAD_REQUEST).json({massage:"the user is not found",stutsErr:getReasonPhrase(StatusCodes.BAD_REQUEST)})
        }else{
            let postFound = await postModel.findOne({_id:postId})
            if(postFound){
                let addComment = await commentModel.insertMany({desc,userId})
                postFound["commentsId"].push(addComment[0])
                let newPost = await postModel.findByIdAndUpdate({_id:postFound._id},{commentsId:postFound.commentsId},{new:true})
                res.status(StatusCodes.ACCEPTED).json({massage:"success",newPost})
            }else{
                res.status(StatusCodes.BAD_REQUEST).json({massage:"the post is not found",stutsErr:getReasonPhrase(StatusCodes.BAD_REQUEST)})

            }


        }
    } catch (error) {
        res.status(StatusCodes.BAD_GATEWAY).json({massage:"found error",error,stutsReason:getReasonPhrase(StatusCodes.BAD_GATEWAY)})
    }
}

module.exports ={ addComment}