const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Article = new Schema(
  {
    title: String,
    short_description: String,
    long_description: String,
    deleted_at: Date,
    authors: [String]
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model("Article", Article);
