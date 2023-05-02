// import { MongoClient } from "mongodb";
// import dotenv from "dotenv"

import db from "../database/database.connect.js"

// dotenv.config();

// const mongoClient = new MongoClient(process.env.DATABASE_URL);

// try {
//     await mongoClient.connect();
//     console.log('Database Connected');
// } catch (error) {
//     console.log(error);
// }


export async function members (req, res) {

    try {

      const analysis = await db.collection("clientProfile").find().toArray()
      return res.send(analysis)

    } catch (error) {

      res.status(500).send("Internal Error")
      
    }
  }