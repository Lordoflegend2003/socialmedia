import User from "../models/user.js";

//read ///


export const getuser =  async ( req , res ) => {
    try{
        const {id} = req.params;
        const user = await User.findbyid(id);
        res.status(200).json(user);
    }
    catch(err){
        res.send(404).json({msg : err.msg});
    }
}


export const getuserfriends  = async (req , res) => {
    try{
        const {id} = req.params;
        const user = await user.findbyid(id);

        const friends = await Promise.all(
            user.friends.map((id) =>  User.findById(id))
        );

        const formattedfriends =  friends.map(
            ({_id , firstname , lastname , occupation , location , picturepath}) => {
                return {_id , firstname , lastname , occupation , location , picturepath};
            }
        );

        res.status(200).json(formattedfriends);

    }
    catch(err){
        res.status(404).json({msg : err.msg});
    }
};


//update //


export const addremovefriend =  async ( req , res) => {
    try{
        const { id , friendsid} =  req.params;
        const user =  await User.findById(id);
        const friend =  await User.findById(friendsid);

        if(user.friends.include(friendsid)){
            user.friends = user.friends.filter((id) =>  { id !== friendsid});
            friend.friends =  friend.friends.filter((id) => { id !== id});
        }
        else{
            user.friends.push(friendsid);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();


        const friends = await Promise.all(
            user.friends.map((id) =>  User.findById(id))
        );

        const formattedfriends =  friends.map(
            ({_id , firstname , lastname , occupation , location , picturepath}) => {
                return {_id , firstname , lastname , occupation , location , picturepath};
            }
        );

        res.status(200).json(formattedfriends);




    }
    catch(err){
        res.status(404).json({msg : err.msg});
    }
}