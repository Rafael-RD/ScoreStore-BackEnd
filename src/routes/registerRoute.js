 import { Router } from "express";
import { signUp } from "../controllers/registerControllers.js";


 const registerRoute = Router()

 registerRoute.post('/SignUp' , signUp);

 export default registerRoute;