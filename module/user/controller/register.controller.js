const userRegisterModel = require('../../../DB/model/userModel/userRegister.model');
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=require("http-status-codes")
const bcrypt = require('bcrypt');

let registerContoller = async(req,res)=>{
    try {
        let {username,email,password,phone} = req.body
        let isFounded = await userRegisterModel.findOne({email})
        if (isFounded) {
            res.status(StatusCodes.BAD_REQUEST).json({massage:"email is found",error:getReasonPhrase(StatusCodes.BAD_REQUEST)})
        } else {
            let newUser = new userRegisterModel({username,email,password,phone})
            let addUser = await newUser.save()
            res.status(StatusCodes.ACCEPTED).json({massage:"added",addUser})
        }
        
    } catch (error) {
        res.status(StatusCodes.BAD_GATEWAY).json({massage:"found error",error,stutsReason:getReasonPhrase(StatusCodes.BAD_GATEWAY)})
    }
}
const signInContoller = async (req,res)=>{
    try {
        let {email,password} = req.body
        let isFounded = await userRegisterModel.findOne({email})
        if (isFounded) {
            bcrypt.compare(password,isFounded.password,function(err,result){
                if (result) {
                    res.status(StatusCodes.ACCEPTED).json({massage:"welcom",userInfo:isFounded})
                }else{
                    res.status(StatusCodes.BAD_REQUEST).json({massage:"password is wrong",err,StutsErr:getReasonPhrase(StatusCodes.BAD_REQUEST)})
                }
            })
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({massage:"email is not found",err,StutsErr:getReasonPhrase(StatusCodes.BAD_REQUEST)})
        }

    } catch (error) {
        res.status(StatusCodes.BAD_GATEWAY).json({massage:"found error",error,stutsReason:getReasonPhrase(StatusCodes.BAD_GATEWAY)})
    }

}

module.exports = {registerContoller,signInContoller}