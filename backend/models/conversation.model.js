import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ],
    messages:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'messages',
            default: []
        }
    ]

    //Date de création ou de mise à jour => conversation.createdAt || updatedAt
}, {timestamps: true});

const Conversation = mongoose.model('conversation',conversationSchema);
export default Conversation;