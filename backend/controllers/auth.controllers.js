import bcrypt from 'bcryptjs';

import Users from '../models/user.model.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signupUser = async (req, res)  => {
    try{
        const {fullName, userName, password, confirmPassword,gender} = req.body;
        if(password!==confirmPassword){
            return res.status(400).json({error:'Passwords don\'t match'})
        }
        const user = await Users.findOne({userName});
        if(user){
            return res.status(400).json({error:'Username already exists'})
        }

        //HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar-placeholder.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar-placeholder.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new Users({
            fullName,
            userName,
            password:hashedPassword,
            gender,
            profilePic: gender==='male'?boyProfilePic:girlProfilePic
        });

        if(newUser){
            //Generate JWT token here
            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();
        
            res.status(201).json({
                _id: newUser.id,
                fullName:newUser.fullName,
                userName:newUser.userName,
                profilePic:newUser.profilePic
            });
        }
        else{
            res.status(400).json({error:'Invalid Data'})
        }

    }
    catch(error){
        console.log("Error in controller",error.message);
        res.status(500).json({error:'Internal Server Error'})
    }
}

export const loginUser = async (req, res)=> {
    try{
        const {userName, password} = req.body;
        const user = await Users.findOne({userName});

        if(!user || !(await bcrypt.compare(password,user.password)) ) {
            return res.status(400).json({error: "Invalid Username or password"});
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
        });

    }
    catch(error){
        console.log("Error in controller",error.message);
        res.status(500).json({error:'Internal Server Error'})
    }
}

export const logoutUser = async (req, res) => {
    try{
        res.cookie('jwt','',{maxAge: 0});
        res.status(200).json({message:'Logout successfully'});
    }
    catch(error){
        console.log("Error in controller",error.message);
        res.status(500).json({error:'Internal Server Error'})
    }
}