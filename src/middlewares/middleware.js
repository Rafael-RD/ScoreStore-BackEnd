
// import { MongoClient } from "mongodb";
// import dotenv from "dotenv"

import db from "../database/database.connect.js";

// dotenv.config();

// const mongoClient = new MongoClient(process.env.DATABASE_URL);

// try {
//     await mongoClient.connect();
//     console.log('Database Connected');
// } catch (error) {
//     console.log(error);
// }


export async function middleware(req, res, next) {

    const { authorization } = req.headers;
    const internalAnalysis = authorization?.replace("Bearer ", "");

    if (!internalAnalysis) return res.status(422).send("ERROR");

    try {

        const room = await db.collection("account").findOne({ token: internalAnalysis });
        if (!room) return res.status(422).send("Access Denied");
        res.locals.session = room;
        next();

    } catch (err) {

        return res.status(500).send(err);
        
    }

}