const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogRouter.get("/", async (req, res) => {
  await res.send("Hello World!");
});

blogRouter.get("/api", async (request, response) => {
  
  const blogs = await Blog.find({})
    response.json(blogs);
  
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  const result = await blog.save()
    response.status(201).json(result);
  
});

blogRouter.put("/:id", async (request, response) => {
  const count = await request.body.likes;
  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { likes:  count + 1}
  );
})

blogRouter.delete("/:id", async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id);
    // response.json(blog);
    await Blog.findByIdAndRemove(request.params.id);
  }catch(err) {
    logger.error(err)
  }
  response.status(204).end();
})

module.exports = blogRouter;
