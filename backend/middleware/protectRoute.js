import jwt from 'jsonwebtoken';
import Users from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        console.log('Ici');
        const token = req.cookies.jwt;
        if(!token){
            console.log("Error in authentification Token");
            return res.status(401).json({error:'User unauthorized'})
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            console.log("Error in authentification Secret");
            return res.status(401).json({error:'User unauthorized'});
        }

        const user = await Users.findById(decoded.userId).select('-password');//Pas de besoin de passer le mot de passe

        if(!user){
            console.log("Error when find UserID");
            return res.status(404).json({error:"User not found"});
        }

        req.user = user; //ajout des informations de l'utilisateur puis passer aux routes
        next();
    } 
    catch (error) {
        console.log("Error in middleware",error.message);
        res.status(500).json({error:'Internal Server Error'})
    }
}

export default protectRoute;