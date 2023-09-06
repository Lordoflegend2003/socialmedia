import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import multer from "multer";
import helmet from "helmet";
import userroutes from "./routes/users.js";
import postsroutes from "./routes/posts.js";
import path from "path";
import { fileURLToPath } from "url";
import authroutes from "./routes/auth.js";
import { register } from "./controllers/auth.js";
import { createposts } from "./controllers/posts.js";
import { verifytoken } from "./middleware/auth.js";
import User from "./models/user.js";
import post from "./models/post.js";
import { users , posts} from "./data/index.js";



// configurations



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}));
app.use(morgan("commom"));
app.use(bodyParser.json({limit : "30mb" , extended : true}));
app.use(bodyParser.urlencoded({limit : "30mb" , extended : true}));
app.use(cors())
app.use("/assets" , express.static(path.join(__dirname , "public/assets")))




//File Storage

const storage = multer.diskStorage({
    destination : function(req,res,cb){
        cb(null , "public/assets");
    },

    filename : function(req , res , cb){
        cb(null , file.originalname);
    },
});


const upload = multer({storage});

//routes with files

app.post("/auth/register" , upload.single("picture") , register);
app.post("/posts" , verifytoken , upload.single("picture"), createposts);



//routes 

app.use("/auth" ,authroutes);
app.use("/users" , userroutes);
app.use("/posts",postsroutes);


// Mongoose setup

const PORT =  process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URl , {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(() => {
    app.listen(PORT , () => console.log(`Server Port: ${PORT}`));

    // User.insertMany(users);
    // post.insertMany(posts);

}).catch((err) => console.log(err));





