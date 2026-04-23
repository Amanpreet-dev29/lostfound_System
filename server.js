const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// TEST
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// ADD ITEM
app.post("/add-item", (req, res) => {
  console.log("BODY:", req.body);

  const { title, description, category, contact } = req.body;

  if (!title || !description) {
    return res.status(400).send("Title and Description required");
  }

  const sql = `
    INSERT INTO items (title, description, category, contact, type)
    VALUES (?, ?, ?, ?, 'lost')
  `;

  db.query(sql, [title, description, category, contact], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error saving item");
    }
    res.send("Item added successfully");
  });
});

// GET ITEMS
app.get("/items", (req, res) => {
  db.query("SELECT * FROM items ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).send("Error fetching items");
    res.json(result);
  });
});

// DELETE
app.delete("/delete-item/:id", (req, res) => {
  db.query("DELETE FROM items WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).send("Error deleting");
    res.send("Deleted");
  });
});

// LOGIN
app.post("/login", (req, res) => {
    console.log("LOGIN BODY:", req.body);

    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (err, result) => {
        if (err) return res.status(500).send("Error");

        if (result.length > 0) {
            res.send("Login successful");
        } else {
            res.send("Invalid email or password");
        }
    });
});


// REGISTER
app.post("/register", (req, res) => {
    console.log("REGISTER BODY:", req.body);

    const { username, email, password } = req.body;

    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

    db.query(sql, [username, email, password], (err) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.send("Email already exists");
            }
            return res.status(500).send("Error");
        }

        res.send("Registration successful");
    });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});