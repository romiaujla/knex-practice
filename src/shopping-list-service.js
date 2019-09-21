const DB_TABLE = 'shopping_list';

const ShoppingListServices = {
    getItems(db){
        return db
            .select('*')
            .from(DB_TABLE);
    },
    getItemById(db, id){
        return db
            .select('*')
            .from(DB_TABLE)
            .where('id', id)
            .first();
    },
    insertItem(db, item){
        return db 
            .insert(item)
            .into(DB_TABLE)
            .returning('*')
            .then(rows => rows[0]);
    },
    updateItem(db, item, itemId){
        return db(DB_TABLE)
            .where({ id })
            .update(newItemFields);
    },
    deleteItem(db, itemId){
        return db
            .from(DB_TABLE)
            .where({ id })
            .delete();
    }
}

module.exports = ShoppingListServices;