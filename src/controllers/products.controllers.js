import { db } from "../database/database.connect.js";

export async function getProducts(req, res){
    try {
        const names=await db.getCollectionNames;
        console.log(names);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}