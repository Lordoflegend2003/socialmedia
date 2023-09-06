import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";

// register user 

export const register = async (req , res)  => {
    try{
        const{
            firstname,
            lastname,
            email,
            password,
            picturepath,
            friends,
            location,
            occupation,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passhash = await bcrypt.hash(password , salt);

        const newuser  = new user({
            firstname,
            lastname,
            email,
            password : passhash,
            picturepath,
            friends,
            location,
            occupation,
            viewedprofile : Math.floor(Math.random() * 100000),
            impression : Math.floor(Math.random() * 100000),
        
    });

    const saveduser = await newuser.save();
    res.status(201).json(saveduser);

    }
    catch(err){
        
        res.status(500).json({error : err.message});

    }
};


//logging in

export const login  =  async (req, res) => {
    try{

        const {email , password} = req.body;
        const cuser = await user.findOne({email : email});

        if(!cuser) return res.status(400).json({msg : "User does not exist."});

        const ismatch = await bcrypt.compare(password , user.password);

        if(!ismatch) return res.status(400).json({msg : "Invalid Credentials"});

        const token = jwt.sign({id : user.__id} , process.env.SECRET_KEY);

        delete user.password ;

        res.status(200).json({token , user});

    }
    catch(err){

        res.status(500).json({error : err.message});

    }
};