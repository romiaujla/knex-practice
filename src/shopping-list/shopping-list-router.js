require('dotenv').config();
const express = require('express');
const shoppingListRouter = express.Router();
const bodyParser = express.json();
const ShoppingListServices = require('../shopping-list-service');

const knex = require('knex');
const db = knex({
    client: 'pg',
    connection: process.env.DB_URL
});

shoppingListRouter
    .route('/item')
    .get((req, res) => {
        let result = {};
        ShoppingListServices.getItems(db)
            .then((res) => {
                result = res;
                console.log(res);
            });
        res.send(`Get / successful`);
    })
    .post(bodyParser, (req, res) => {
        res.send(`POST shopping-list/ reached`);
    });

shoppingListRouter
    .route('/item/:id')
    .get((req, res) => {
        const { id } = req.params;
        res.send(`GET shopping-list/item/${id} reached`);
    })
    .delete((req, res) => {
        const { id } = req.params;
        res.send(`DELETE shopping-list/item/${id} reached`);
    })
    .patch(bodyParser, (req, res) => {
        const { id } = req.params;
        res.send(`PATCH shopping-list/item/${id} reached`);
    })

module.exports = shoppingListRouter;