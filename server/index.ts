import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import UserController from "./controllers/UserController";
import PostController from "./controllers/PostController";

const app = express();
dotenv.config({
    path: 'server/.env'
});
import './core/db';

app.use(cors());
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

app.get('/registration', UserController.registration);
app.post('/project', PostController.create);
app.get('/project', PostController.show);
app.get('/projects', PostController.getAll);

app.listen(3001, () => {
    console.log('server running');
});