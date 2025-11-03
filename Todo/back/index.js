const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Todo = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/test");

// Get all todos
app.get("/todos", (req, res) => {
  Todo.find()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

// Add a todo
app.post("/add", (req, res) => {
  const { task } = req.body;
  Todo.create({ task })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

// Toggle done
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  Todo.findById(id)
    .then((todo) => {
      if (!todo) return res.status(404).send("Todo not found");
      todo.done = !todo.done;
      return todo.save();
    })
    .then((updated) => res.json(updated))
    .catch((err) => res.status(500).json(err));
});

// Delete a todo
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  Todo.findByIdAndDelete(id)
    .then(() => res.send("Deleted"))
    .catch((err) => res.status(500).json(err));
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
