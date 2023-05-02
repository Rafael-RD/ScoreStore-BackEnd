import db from "../database/database.connect.js";

export async function getProducts(req, res){
    try {
        const products=await db.collection('products').find().toArray();
        // console.log(products);
        return res.send(products);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}