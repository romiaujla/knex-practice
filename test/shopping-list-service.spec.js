const knex = require('knex');
const ShoppingListServices = require('../src/shopping-list-service');
const DB_TABLE = `shopping_list`;

describe(`Shopping List Services`, () => {
    let db;

    let testItems = [
        {
            id: 1,
            name: 'Chai',
            price: '2.5',
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            category: 'Snack'
        },
        {
            id: 2,
            name: 'Lays',
            price: '1.0',
            date_added: new Date('1990-1-27T16:28:32.615Z'),
            category: 'Snack'
        },
        {
            id: 1,
            name: 'Green Tea',
            price: '1.4',
            date_added: new Date('2019-09-19T16:28:32.615Z'),
            category: 'Breakfast'
        },
        {
            id: 1,
            name: 'Chicken Parmesan',
            price: '2.5',
            date_added: new Date('2020-01-01T16:28:32.615Z'),
            category: 'Main'
        },
        {
            id: 1,
            name: 'Curry and Rice',
            price: '2.5',
            date_added: new Date('2020-02-01T16:28:32.615Z'),
            category: 'Lunch'
        },
    ]

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
    });

    before(() => {
        return db(DB_TABLE).truncate();
    });

    afterEach(() => {
        return db(DB_TABLE).truncate();
    });

    after(() => {
        return db.destroy();
    })

    beforeEach(() => {
        return db
            .into(DB_TABLE)
            .insert(testItems);
    });

    describe(`getItems()`, () => {
        it(`gets all items form the shopping list table`, () => {
            return ShoppingListServices.getItems(db)
                .then((actual) => {
                    expect(actual).to.eql('array');
                });
        });
    });
});
