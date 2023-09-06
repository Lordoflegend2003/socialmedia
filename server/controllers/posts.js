import post from "../models/post.js";
import User from "../models/user.js";


//create //

export const createposts =  async(req , res) => {
    try{
        const {userid , description , picturepath} = req.body;
        const user = await User.findById(userid);
        const newpost = new post({
            userid,
            firstname : user.firstname,
            lastname : user.lastname,
            location : user.location,
            description,
            userpicturepath : user.picturepath,
            picturepath,
            likes:{},
            comments : [],
        });

    await newpost.save();

    const Post = await post.find()

    res.status(201).json(Post);

    }
    catch(err){
        res.status(409).json({msg : err.msg});
    }
};


///read///

export const getfeedposts = async(req , res) => {
    try{
        const Post = await post.find();

        res.status(200).json(Post);

    }
    catch(err){
        res.status(404).json({msg : err.msg});
    }
}


export const getuserposts = async(req , res) => {
    try{
        const {userid} = req.params;
        const Post = await post.find({userid});
        res.status(200).json(Post);
    }
    catch(err){
        res.status(404).json({msg : err.msg});
    }
}



// update //


export const likepost = async (req , res) => {
    try{
        const {id} = req.params;
        const {userid } = req.body;
        const Post = await post.findById({id});
        const isliked = await Post.likes.get(userid);

        if(isliked){
            Post.likes.delete(userid);
        }
        else{
            Post.likes.set(userid , true);
        }

        const updatedPost = await post.findByIdAndUpdate(
            id,
            {likes : Post.likes},
            { new : true},
        );

      
        res.status(200).json(updatedPost);
    }
    catch(err){
        res.status(404).json({msg : err.msg});
    }
}


