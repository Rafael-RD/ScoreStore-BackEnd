// Imports:
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import joi from 'joi';
import dayjs from 'dayjs';
import { stripHtml } from "string-strip-html";
import router from './routes/index.routes.js';

// Configs:
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
dotenv.config();
dayjs().format();


// Schemas:

//---------------Usar a pasta schemas

// const exampleSchema = joi.object({
    // type: joi.string().required().valid('type1', 'type2')
// });


// EndPoints:

//---------------Usar routes e controller

// app.post('/', async (req, res) => {
//     try {
//         res.sendStatus(201);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// app.get('/', async (req, res) => {
//     try {
//         res.sendStatus(200);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });


// Run Server:
//--------------Criar .env com PORT=<escolhe ai meu>
app.listen(process.env.PORT, () => {
    console.log(`Running server on localhost:${process.env.PORT}`);
});