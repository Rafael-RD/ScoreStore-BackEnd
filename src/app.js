// Imports:
import express, { json } from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import joi from 'joi';
import dayjs from 'dayjs';
import { stripHtml } from "string-strip-html";

// Configs:
const app = express();
app.use(cors());
app.use(json());
dotenv.config();
dayjs().format();

// DataBase:
const mongoClient = new MongoClient(process.env.DATABASE_URL);
try {
    await mongoClient.connect();
    console.log('MongoDB Connected!');
} catch (err) {
    console.log(err.message);
}
const db = mongoClient.db();

// Schemas:
const exampleSchema = joi.object({
    type: joi.string().required().valid('type1', 'type2')
});


// EndPoints:
app.post('/', async (req, res) => {
    try {
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/', async (req, res) => {
    try {
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// Run Server:
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Running server on localhost:${PORT}`);
});