const express = require('express');

const app = express();

app.use('/', (req, res) =>{
    res.send("welcome to homepage!");
})

app.listen(8000,(err) =>{
    console.log("The server connected at port 8000!");
});