const userRouter = require("express").Router()
let validation = require("../../middleware/validation")
const {userSignUp,userSignIn} = require('./uservalid');
let {registerContoller,signInContoller} = require("./controller/register.controller")
userRouter.post("/register",validation(userSignUp),registerContoller)
userRouter.post("/signIn",validation(userSignIn),signInContoller)


module.exports = userRouter