
import bcrypt from "bcrypt";
import { registerSchema } from "../schemas/registerSchema.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config();


const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {
    await mongoClient.connect();
} catch (error) {
    console.log(error);
}
 const db = mongoClient.db();


export async function signUp(req, res) {
  

    const { name, email, password, confirmPassword } = req.body;
    const { error } = registerSchema.validate({
  
      name,
      email,
      password,
      confirmPassword,
  
    });
  
    if (error) {
  
      const errorMessage = error.details.map((err) => err.message);
      return res.status(422).send(errorMessage);
  
    }
  
    const shibboleth = bcrypt.hashSync(password, 10);
  
    try {
  
      const invalid = await db.collection("clientProfile").findOne({ email: email });
  
      if (invalid)
  
        return res.status(409).send("Invalid email");
  
      await db.collection("clientProfile").insertOne({ name, email, password: shibboleth });
      res.status(201).send("Created");
  
    } catch (error) {
  
      res.status(500).send(error.message);
      
    }
  }