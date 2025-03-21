
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

const deleteMessageController = async function(req,res){
    try{
        const { messageId } = req.params
        const id = req.user._id;

        const message = await messageModel.findOne({_id: messageId})
        console.log(message);
        
        if(!message){
            return res.status(400).json({message: "Message not found"})
        }

        if(message.userId.toString() !== id.toString()){
            return res.status(400).json({message: "Cant delete message"})
        }

        const deletedMessage = await messageModel.findByIdAndDelete(messageId)

        res.status(200).json({
            deletedMessage
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    getMessagesController,
    deleteMessageController
}