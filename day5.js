require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db')
const person = require('./modal/person');
const menuitem = require('./modal/menu');


const bodyparser = require('body-parser');
app.use(bodyparser.json());
const PORT=process.env.PORT||3000;


app.get('/', (req, res) => {
    res.send("hello local host");
})

const personroutes=require('./routes/personroutes');
app.use('/person',personroutes);

const menuroutes=require('./routes/menuroutes');
app.use('/menuitem',menuroutes);
app.listen(PORT, () => {
    console.log("server is running")
})