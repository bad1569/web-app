const itemModel = require('../models/itemModel');


exports.getItems = (req, res) => {
    itemModel.getAllItems((err, items) => {
        if (err) {
            return res.status(500).send('Error fetching items');
        }
        res.render('index', { items });
    });
};


exports.addItem = (req, res) => {
    const { name, description } = req.body;
    itemModel.addItem(name, description, (err, newItem) => {
        if (err) {
            return res.status(500).send('Error adding item');
        }
        res.redirect('/');
    });
};


exports.updateItem = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    itemModel.updateItem(id, name, description, (err, updatedItem) => {
        if (err) {
            return res.status(500).send('Error updating item');
        }
        res.redirect('/');
    });
};


exports.patchItem = (req, res) => {
    const { id } = req.params;
    const updates = req.body;  
    itemModel.patchItem(id, updates, (err, updatedItem) => {
        if (err) {
            return res.status(500).send('Error updating item');
        }
        res.redirect('/');
    });
};

exports.deleteItem = (req, res) => {
    const { id } = req.params;
    itemModel.deleteItem(id, (err) => {
        if (err) {
            return res.status(500).send('Error deleting item');
        }
        res.redirect('/');
    });
};
