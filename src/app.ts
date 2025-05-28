import express from 'express';
import { json } from 'express';
import {sequelize} from './db'
import contactRoute from './routers/contactRouter';
import dotenv from "dotenv";
dotenv.config();

export const app = express();

app.use(express.json());

app.use('/', contactRoute)

const serverPort = process.env.PORT;
sequelize.sync().then(()=>{
    app.listen(serverPort, () =>{console.log("server running on port 8000!")});
});