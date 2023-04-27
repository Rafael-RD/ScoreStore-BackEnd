import { Router } from "express";
import productsRouter from "./products.routes.js";

const router=Router();

//Adicione os outros roters aqui

router.use(productsRouter);
// router.use(authRouter);

export default router;