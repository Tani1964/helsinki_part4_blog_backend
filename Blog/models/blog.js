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
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});


//Blog name is used to name the collection in the db
module.exports = mongoose.model("Blog", blogSchema);