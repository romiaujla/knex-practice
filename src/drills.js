require('dotenv').config();
const knex = require('knex');
const db = knex({
    client: 'pg',
    connection: process.env.DB_URL
});
const DB_TABLE = 'shopping_list';

function getAllItems(searchTerm){

    console.log(`\nReturns all items with the added search term: \n`);

    db
        .select('*')
        .from(DB_TABLE)
        .where(
            'name',
            'ILIKE',
            `%${searchTerm.toLowerCase()}%`
        )
        .then((res) => {
            console.log(res)
        });
}

function getItemsOnPage(pageNumber){

    const itemsOnPage = 6;
    const offset = itemsOnPage * (pageNumber - 1);

    console.log(`\nReturns ${itemsOnPage} items on page number:${pageNumber}\n`);

    db
        .select('*')
        .from(DB_TABLE)
        .limit(itemsOnPage)
        .offset(offset)
        .then((res) => {
            console.log(res);
        })
}

function getItemsAfterDate(daysAgo){

    console.log(`\nReturns all the items added after ${daysAgo} days `);

    db
        .select('*')
        .from(DB_TABLE)
        .where(
            'date_added',
            '>',
            db.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .then((res) => {
            console.log(res);
        })
}

function totalCostForEachCategory(){

    console.log(`\nReturns the total cost grouped by categories`);
    
    db
        .select(`category`)
        .from(DB_TABLE)
        .sum(`price`)
        .groupBy(`category`)
        .then((res) => {
            console.log(res);
        })
}

// Get all items that contain text
getAllItems('BACON');

// Get all items paginated
getItemsOnPage(2);

// Get all items after date
getItemsAfterDate(10);

// Get the total cost for each category
totalCostForEachCategory();