
const messageModel = require("../models/message.model");

const getMessagesController = async function(req,res){
    try{
        const projectId = req.params.projectId;
        const messages = await messageModel.find({projectId}).populate("userId")

        res.status(200).json({
            data: messages
        })
    }
    catch(err){
        resizeBy.status(400).json({
            message: err.message
        })
    }
}

module.exports = {
    getMessagesController
}