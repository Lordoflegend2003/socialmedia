import express from "express";
import{
    getuser,
    getuserfriends,
    addremovefriend,
} from "../controllers/users.js";

import { verifytoken} from "../middleware/auth.js";

const router = express.Router();


/// Read //////

router.get("/:id" , verifytoken , getuser);
router.get("/:id/friends" , verifytoken , getuserfriends);

// update //

router.patch("/:id/:friendsid" , verifytoken , addremovefriend);

export default router;


 
