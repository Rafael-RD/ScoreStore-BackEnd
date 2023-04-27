import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {
    await mongoClient.connect();
    console.log('Database Connected');
} catch (error) {
    console.log(error);
}

export const db = mongoClient.db();


/*
produts on database

name: string
genre: array
price: number
image: url
description (if game page implemented): string
*/