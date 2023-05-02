import db from "../database/database.connect.js";

export async function postOrder(req, res){
    const {cartList,token} = req.body;
    try {
        const user = await db.collection('account').findOne({token});
        if (!user) return res.sendStatus(401)
        await db.collection('orders').insertOne({cartList, _id: user._id});
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}