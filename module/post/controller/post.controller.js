const userModel = require('../../../DB/model/userModel/userRegister.model');
const postModel = require("../../../DB/model/postModel/post.model")
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=require("http-status-codes")


const addPost = async(req,res)=>{
    try {
        let {title,desc,userId} = req.body
        let isFound = await userModel.findOne({_id:userId})
        if(!isFound){
            res.status(StatusCodes.BAD_REQUEST).json({massage:"the user is not found",stutsErr:getReasonPhrase(StatusCodes.BAD_REQUEST)})
        }else{
            let addPost = await postModel.insertMany({title,desc,userId})
            res.status(202).json({massage:"the post added",addPost})
        }
    } catch (error) {
        res.status(StatusCodes.BAD_GATEWAY).json({massage:"found error",error,stutsReason:getReasonPhrase(StatusCodes.BAD_GATEWAY)})
    }

}

const allPost = async(req,res)=>{
    const getAllPost = await postModel.find({}).populate({
        path:"commentsId",
        model:"comment",
        populate:{
            path:"userId",
            model:"user",
            select:"username"
        }
    }).populate({
        path:"userId",
        model:"user",
        select:"username"
    })
    res.status(StatusCodes.ACCEPTED).json({massage:"allPost",getAllPost})
}


module.exports = {addPost,allPost}