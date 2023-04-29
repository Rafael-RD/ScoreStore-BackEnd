import { Router } from "express";
import productsRouter from "./products.routes.js";
import registerRoute from "./registerRoute.js";


const router=Router();

//Adicione os outros roters aqui

router.use(productsRouter);
router.use(registerRoute);


export default router;