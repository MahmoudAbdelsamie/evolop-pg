const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();


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
