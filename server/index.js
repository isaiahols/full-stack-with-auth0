require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , massive = require('massive');

const app = express();
const { SERVER_PORT, SERVER_SECRET } = process.env

// middleware
app.use(express.json())
app.use(session({
    secret: SERVER_SECRET,
    resave: false,
    saveUninitialized: true,
}))





// endpoints







// please don't touch me!!!

app.listen(SERVER_PORT, () => {

    console.log(`we are here on ${SERVER_PORT}`)
})