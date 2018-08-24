require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , massive = require('massive')
    , axios = require('axios');

const app = express();
const {
    SERVER_PORT,
    SERVER_SECRET,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    REACT_APP_DOMAIN,
    CONNECTION_STRING,
    NODE_ENV
} = process.env

// database connection
massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})


// middleware
app.use(express.json())
app.use(session({
    secret: SERVER_SECRET,
    resave: false,
    saveUninitialized: true,
}))

function envCheck(req, res, next) {
    if (NODE_ENV === 'dev') {
        req.app.get('db').get_user_by_id().then(userWithIdOne => {
            req.session.user = userWithIdOne[0]
            next()
        })
    } else {
        next()
    }
}





// endpoints

app.get('/auth/callback', async (req, res) => {
    const payload = {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `http://${req.headers.host}/auth/callback`
    }

    // trade code for token 
    let resWithToken = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload);

    // use token for user info 
    let resWithUserData = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${resWithToken.data.access_token}`);

    let {
        email,
        name,
        picture,
        sub,
    } = resWithUserData.data;

    let db = req.app.get('db')

    // looking if user already exist
    let foundUser = await db.find_user([sub])

    if (foundUser[0]) {
        // if user exists set user to sessions
        req.session.user = foundUser[0];
        res.redirect('/#/private')
    } else {
        // 
        let createdUser = await db.create_user(name, email, picture, sub)
        req.session.user = createdUser[0];
        res.redirect('/#/private')
    }

})

app.get('/api/user-data', envCheck, (req, res) => {
    // checking if user is signed in
    if (req.session.user) {
        res.status(200).send(req.session.user)
    } else {
        res.status(401).send('nope! try signing in...');
    }
})

app.get('/auth/logout', (req, res) => {
    // wipes the session for user
    req.session.destroy()
    res.redirect('http://localhost:3000/')
})





// please don't touch me!!!

app.listen(SERVER_PORT, () => {

    console.log(`we are here on ${SERVER_PORT}`)
})