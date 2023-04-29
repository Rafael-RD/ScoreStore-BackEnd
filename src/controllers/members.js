import { db } from "../database/database.connect"


export async function members (req, res) {

    try {

      const analysis = await db.collection("clientProfile").find().toArray()
      return res.send(analysis)

    } catch (error) {

      res.status(500).send("Internal Error")
      
    }
  }