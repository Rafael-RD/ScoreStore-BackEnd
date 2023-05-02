
import bcrypt from "bcrypt";
import { registerSchema } from "../schemas/registerSchema.js";
// import { MongoClient } from "mongodb";
// import dotenv from "dotenv"
import { v4 as uuidv4 } from "uuid";
import db from "../database/database.connect.js";

// dotenv.config();


// const mongoClient = new MongoClient(process.env.DATABASE_URL);

// try {
//     await mongoClient.connect();
// } catch (error) {
//     console.log(error);
// }
//  const db = mongoClient.db();



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

  export async function signIn(req, res) {

    const { email, password } = req.body;
  
    const generateCode = uuidv4();
  
    try {
  
      const internalAnalysis = await db.collection("clientProfile").findOne({ email });
  
      if (!internalAnalysis) return res.status(400).send("Invalid username or password");
  
      const psswrd = bcrypt.compareSync(password, internalAnalysis.password);
  
      if (!psswrd) {
  
        return res.status(400).send("Invalid username or password");
  
      }
  
      const completeProfile = await db.collection("account").findOne({ _id: internalAnalysis._id });
  
      if (completeProfile) {
  
        await db.collection("account").updateOne(
  
          { _id: internalAnalysis._id },
          {
            $set: { token: generateCode },
          }
        );
  
      } else {
  
        const invalid = await db.collection("account").findOne({ _id: internalAnalysis._id });
  
        if (!invalid) {
  
          await db.collection("account").insertOne({ _id: internalAnalysis._id, token: generateCode });
  
        }
      }
  
      const checkk = await db.collection("data").findOne({ _id: internalAnalysis._id });
  
      if (!checkk) {
  
        const mainUser = {
  
          _id: internalAnalysis._id,
          name: internalAnalysis.name,
          wallet: [],
  
        };
        await db.collection("data").insertOne(mainUser);
  
      }
  
      return res.status(200).send({token: generateCode, name: internalAnalysis.name});
  
    } catch (error) {
  
      res.status(500).send(error.message);
  
    }
  }