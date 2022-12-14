const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controlers/register');
const signin = require('./controlers/signin');
const profile = require('./controlers/profile');
const image = require('./controlers/image.js');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'minhaZ*khaN',
    database : 'smartbrain'
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Our App is working!');
});

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res)
});


app.listen(process.env.PORT || 3001, ()=> {
    console.log(`App is running on port ${process.env.PORT}`);
});


