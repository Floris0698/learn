import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    receverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    message:{
        type: String,
        required: true
    }

    //Date de création ou de mise à jour => message.createdAt || updatedAt
}, {timestamps: true});

const Message = mongoose.model('messages',messageSchema);
export default Message;