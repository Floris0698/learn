import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    gender:{
        type:String,
        required:true,
        enum: ['male','female']
    },
    profilePic:{
        type:String,
        default:''
    }

    //Date de création ou de mise à jour => users.createdAt || updatedAt
}, {timestamps: true});

const Users = mongoose.model('users',userSchema);
export default Users;