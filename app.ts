import express from 'express';
import {sequelize} from './db'
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use('/identify', (req, res) =>{
    res.send("welcome to homepage!");
})

app.listen(8000,(err) =>{
    console.log("The server connected at port 8000!");
});

const serverPort = process.env.PORT;
sequelize.sync().then(()=>{
    app.listen(serverPort, () =>{console.log("server running on port 8000!")});
});