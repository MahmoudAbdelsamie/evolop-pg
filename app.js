const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);


require('dotenv').config();

const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const budgetRoutes = require('./routes/budget');
const db = require('./utils/database');
const { testDBConnection } = require('./utils/helpers');


const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(helmet());
app.use(cors());
app.use(cookieParser());

app.use(session({
    store: new pgSession({
        pool: db,
        tableName: 'session'
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        // httpOnly: true,
        // secure: true
    }
}))

app.use(userRoutes);
app.use(categoryRoutes);
app.use(budgetRoutes);


app.get('/', (req, res, next) => {
    res.send('<h1>Welcome To Evolop!</h1>')
})


testDBConnection()
    .then(result => {
        console.log('Connected To Postgres...')
        app.listen(PORT, () => {
            console.log(`Server is running on Port ${PORT}`);
        });
    })
    .catch(err => {
        console.log('Error: ', err);
    })
