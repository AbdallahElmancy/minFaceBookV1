const postRouter = require("express").Router()
let {addPost,allPost} = require("./controller/post.controller")
postRouter.post("/addPost",addPost)
postRouter.get("/allPost",allPost)
module.exports = postRouter