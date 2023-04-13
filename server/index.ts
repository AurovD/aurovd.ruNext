import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { passport } from './core/passport';
// import bodyParser from "body-parser";
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
app.post('/project', passport.authenticate('jwt', { session: false }), PostController.create);
app.get('/project', PostController.show);
app.get('/projects', PostController.getAll);
app.post('/login', UserController.login);
app.post('/change', passport.authenticate('jwt', { session: false }), UserController.change);
app.get('/me', passport.authenticate('jwt', { session: false }), UserController.me);
app.get('/tags', PostController.tags);
app.post('/delete_image', passport.authenticate('jwt', { session: false }), PostController.deleteImage);
app.post('/add_image/:id', passport.authenticate('jwt', { session: false }), PostController.addImage);
app.get('/test', UserController.test);

app.listen(3001, () => {
    console.log('server running');
});