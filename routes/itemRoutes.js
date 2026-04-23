const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Add new item
router.post("/add-item", (req, res) => {
    const { title, description, category, contact, type } = req.body;

    const sql = `
        INSERT INTO items (title, description, category, contact, type)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [title, description, category, contact, type], (err) => {
        if (err) {
            console.log(err);
            return res.send("Error inserting");
        }
        res.send("Item added");
    });
});


// ✅ Get all items
router.get("/items", (req, res) => {
  const sql = "SELECT * FROM items ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching data");
    }
    res.json(results);
  });
});


// ✅ Optional: Delete item (bonus feature)
router.delete("/delete-item/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM items WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error deleting item");
    }
    res.send("Item deleted successfully");
  });
});

module.exports = router;
