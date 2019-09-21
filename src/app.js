require('dotenv').config();
const {NODE_ENV} = require('./config');
const express = require('express');
const morgan = require('morgan');
const cors = require ('cors');
const helmet = require('helmet');
const shoppingListRouter = require('./shopping-list/shopping-list-router');

const app = express();
const morganOptions = NODE_ENV === 'production' 
    ? 'tiny' 
    : 'common';
app.use(morgan(morganOptions));
app.use(helmet());
app.use(cors());

app.use(`/shopping-list`, shoppingListRouter);

app.use((error, req, res, next) => {
    let response = {};

    console.log(error);
    
    if(NODE_ENV === 'production'){
        response = {
            error: {
                message: `server error`
            }
        }
    }else{
        response = {
            error
        }
    }
    return res
        .status(500)
        .json(response);
})

module.exports = app;