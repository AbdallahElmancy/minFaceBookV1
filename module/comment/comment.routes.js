const commentRouter = require("express").Router()
let {addComment} = require("./controller/comment.controller")

commentRouter.post("/addComment",addComment)

module.exports = commentRouter