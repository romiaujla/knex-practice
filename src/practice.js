require('dotenv').config();
const knex = require('knex');
const db = knex({
    client: 'pg',
    connection: process.env.DB_URL
});

const qry = db
  .select('product_id', 'name', 'price', 'category')
  .from('amazong_products')
  .where({ name: 'Point of view gun' })
  .first()
  .toQuery();

console.log(qry)

