import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import UserController from "./controllers/UserController";

const app = express();

dotenv.config({
    path: 'server/.env'
});
import './core/db';

app.use(cors());
app.use(express.json());

app.post('/registration', UserController.registration);

app.listen(3001, () => {
    console.log('server running');
});