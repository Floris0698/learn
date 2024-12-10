import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try{
        const {message} = req.body;
        const {id: receverId} = req.params;
        const senderId = req.user._id;
        
        let conversation = await Conversation.findOne({
            participants: {$all: [senderId,receverId]},
        });

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId,receverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receverId,
            message
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        await newMessage.save();
        await conversation.save();
        
        res.status(201).json({message:`Message sent by ${req.user.userName}`})
    }
    catch(error){
        console.log("Error in controller",error.message);
        res.status(500).json({error:'Internal Server Error'})
    }
}