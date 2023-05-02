 import { Router } from "express";
import { signUp } from "../controllers/registerControllers.js";
import { signIn } from "../controllers/registerControllers.js";
import { members } from "../controllers/members.js";


 const registerRoute = Router()

 registerRoute.post('/SignUp' , signUp);
 registerRoute.post('/SignIn' , signIn);
 registerRoute.post('/users' , members);


 export default registerRoute;