const db = require('../db/db');  

const getAllItems = (callback) => {
    db.all('SELECT * FROM items', [], (err, rows) => {
        if (err) {
            console.error('Error fetching items:', err);
            callback(err, null);
        } else {
            callback(null, rows);  
        }
    });
};


const addItem = (name, description, callback) => {
    db.run('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], function(err) {
        if (err) {
            console.error('Error inserting item:', err);
            callback(err, null);
        } else {
            callback(null, { id: this.lastID, name, description });
        }
    });
};


const updateItem = (id, name, description, callback) => {
    db.run('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id], function(err) {
        if (err) {
            console.error('Error updating item:', err);
            callback(err, null);
        } else {
            callback(null, { id, name, description });
        }
    });
};


const patchItem = (id, updates, callback) => {
    const updateFields = Object.keys(updates)
        .map(field => `${field} = ?`)
        .join(', ');
    const values = [...Object.values(updates), id];

    db.run(`UPDATE items SET ${updateFields} WHERE id = ?`, values, function(err) {
        if (err) {
            console.error('Error updating item:', err);
            callback(err, null);
        } else {
            callback(null, { id, ...updates });
        }
    });
};


const deleteItem = (id, callback) => {
    db.run('DELETE FROM items WHERE id = ?', [id], function(err) {
        if (err) {
            console.error('Error deleting item:', err);
            callback(err, null);
        } else {
            callback(null, { id });
        }
    });
};


module.exports = {
    getAllItems,
    addItem,
    updateItem,
    patchItem,
    deleteItem
};
