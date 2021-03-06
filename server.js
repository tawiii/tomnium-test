const express = require('express');
const mongoose = require('mongoose');
const bodyParser =  require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const product = require('./routes/api/product');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db =  require('./config/keys').mongoUri;
mongoose.connect(db)
.then(() => console.log("MongoDb connected"))
.catch(err =>  console.log(err));

app.use(passport.initialize())
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/product', product);

const port = process.env.PORT  | 5000;

app.listen(port , () => console.log(`Server running on  port ${port}`));
