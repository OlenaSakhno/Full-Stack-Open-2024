const blogsRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");

// const getTokenFrom = (request) => {
//   const authorization = request.get("authorization");
//   if (authorization && authorization.startsWith("Bearer ")) {
//     return authorization.replace("Bearer ", "");
//   }
//   return null;
// };

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = new Blog(request.body);
  if (!request.token) {
    return response.status(401).json({ error: "token invalid or missing " });
  }
  let decodedToken = "";
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET);
  } catch (err) {
    return response.status(400).send(err);
  }

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: user.username,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  if (!request.token) {
    return response.status(400).json({ error: "token invalid or missing" });
  }

  let decodedToken = "";
  try {
    decodedToken = await jwt.verify(request.token, process.env.SECRET);
  } catch (error) {
    return response.status(400).send(error);
  }

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const userFromToken = await User.findById(decodedToken.id);

  //compare user author
  console.log("id", request.params.id);
  const blogToDelete = await Blog.findById(request.params.id);
  console.log("blogToDelete", blogToDelete);
  console.log(blogToDelete.user);
  console.log("userFromToken._id.toString()=>", userFromToken._id.toString());

  if (userFromToken._id.toString() === blogToDelete.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)

      .then((result) => {
        response.status(204).end();
      })
      .catch((error) => next(error));
  } else {
    return response.status(401).json({ error: "Authorized user" });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    uls: body.url,
    likes: body.likes,
  };

  Blog.findByIdAndUpdate(request.params.id, blog)
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

module.exports = blogsRouter;
