const mongoose = require("mongoose");
console.log(3)

const blogSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
  },
  author: { type: "string", required: true },
  url: String,
  likes: Number,
});

//Blog name is used to name the collection in the db
module.exports = mongoose.model("Blog", blogSchema);