const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import Model
const Article = require("./models/Article");

// Connect to MongoDB
mongoose.connect(
  "mongodb://localhost:27017/VMBlog", { useFindAndModify: false, useNewUrlParser: true },
  () => console.log("MongoDB is connected")
);

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Get all of our articles
app.get("/api/articles", (req, res) => {
  Article.find({deleted_at: null}).then(articles => {
    res.json(articles);
  });
});

// Get One of Our articles
app.get("/api/articles/:id", (req, res) => {
  Article.findOne({ _id: req.params.id }).then(article => {
    res.json(article);
  });
});

// Create and Update article
app.post("/api/articles", (req, res) => {
  const data = {
    title: req.body.title,
    short_description: req.body.short_description,
    long_description: req.body.long_description,
    authors: JSON.stringify(req.body.authors).slice(1, -1).split(',')
  };
  Article.findOne({ _id: req.body.id }, (err, article) => {
    if (article) {
      Article.findByIdAndUpdate(req.body.id, data, { upsert: false }).then(
        updated => {
          res.json(updated);
        }
      );
    } else {
      Article.create(data).then(created => {
        res.json(created);
      });
    }
  });
});

// Delete selected article
app.post("/api/articles/:id", (req, res) => {
  const data = {
    deleted_at: new Date()
  }
  Article.findByIdAndUpdate(req.params.id,data).then(article => {
    res.json({ message: "Your post was deleted!" });
  });
});

app.listen(3333, () => console.log("Server is running on port 3333"));
