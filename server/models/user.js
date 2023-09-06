import mongoose from "mongoose";

const Userschema =  new mongoose.Schema(
    {
        firstname : {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },  
        lastname : {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },  
        email: {
            type: String,
            required: true,
            max: 50,
            unique:true,
        },  
        email: {
            type: String,
            required: true,
            min: 5,
        },  
        picturepath :{
            type: String,
            default: "",
        },

        friends :{
            type: Array,
            default: [],
        },
        location : String,
        occupation : String,
        viewedprofile : Number,
        impression : Number,
    },
    {timestamps : true}
);


const User = mongoose.model("User" ,Userschema)

export default User ;