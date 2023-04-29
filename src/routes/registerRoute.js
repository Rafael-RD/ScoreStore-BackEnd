 import { Router } from "express";
import { signUp } from "../controllers/registerControllers.js";
import { signIn } from "../controllers/registerControllers.js";


 const registerRoute = Router()

 registerRoute.post('/SignUp' , signUp);
 registerRoute.post('/SignIn' , signIn);
 

 export default registerRoute;