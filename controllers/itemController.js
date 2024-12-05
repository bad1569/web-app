const db = require('../models/db');
exports.getItems = (req, res) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.render('index', { items: rows });
  });
};


exports.addItem = (req, res) => {
  const { name, description } = req.body;
  db.run('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], function (err) {
    if (err) return res.status(500).send(err.message);
    res.redirect('/');
  });
};


exports.updateItem = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  db.run('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/');
  });
};


exports.patchItem = (req, res) => {
  const { id } = req.params;
  const updates = Object.keys(req.body)
    .map(key => `${key} = ?`)
    .join(', ');
  const values = Object.values(req.body).concat(id);

  db.run(`UPDATE items SET ${updates} WHERE id = ?`, values, (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/');
  });
};


exports.deleteItem = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM items WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/');
  });
};
