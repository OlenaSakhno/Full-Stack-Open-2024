const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Mrs",
    author: "Olena",
    url: "https://fly.io/apps/falling-meadow-5720",
    likes: 4,
    _id: "643eaa247f38c1eea500e439",
    __v: 0,
  },
  {
    title: "Ms",
    author: "Mariia",
    url: "https://google.co.uk",
    likes: 120,
    _id: "643eaa697f38c1eea500e43b",
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

//4.8: Blog list tests, step1
// Use the supertest package for writing a test that makes an HTTP GET request to the
// /api/blogs URL. Verify that the blog list application returns the correct amount of
//blog posts in the JSON format.
test("blogs are returned as json", async () => {
  const response = await api.get("/api/blogs");
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(response.body).toHaveLength(initialBlogs.length);
});

afterAll(async () => {
  await mongoose.connection.close();
});

//4.9: Blog list tests, step2.
//test that verifies that the unique identifier property of the blog posts is named id,
// by default the database names the property _id .
test("a unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

// //4.10: Blog list tests, step3 .
// // test that verifies that making an HTTP POST request to the /api/blogs URL successfully
// // creates a new blog post. At the very least, verify that the total number of blogs in
// // the system is increased by one. You can also verify that the content of the blog post
// // is saved correctly to the database.
test("new blog can be added", async () => {
  const newBlog = {
    title: "Mr",
    author: "Smyth",
    url: "https://gov.uk",
    likes: 300,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const urls = response.body.map((r) => r.url);
  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(urls).toContain("https://gov.uk");
});

// 4.11*: Blog list tests, step4
//if the likes property is missing from the request, it will default to the value 0)
test("if likes property is missing, it will default 0 ", async () => {
  const newBlog = {
    title: "Ms",
    author: "Sakhno",
    url: "https://dedalus.com",
  };
  await api.post("/api/blogs").send(newBlog);
  const response = await api.get("/api/blogs");
  const result = await response.body.find((r) => r.author === "Sakhno");
  expect(result.likes).toBe(0);
});

//4.12*: Blog list tests, step5
// verify that if the title or url properties are missing from the request data,
//the backend responds to the request with the status code 400 Bad Request .

test("if author or url properties are missing, return status 400", async () => {
  const newBlog1 = {
    title: "Ms",
    url: "https://dedalus.com",
    likes: 8,
  };
  const newBlog2 = {
    title: "Ms",
    author: "Ann",
    likes: 8,
  };
  await api.post("/api/blogs").send(newBlog1).expect(400);
  await api.post("/api/blogs").send(newBlog2).expect(400);
});

// 4.13 Blog list expansions, step1
// Implement functionality for deleting a single blog post resource.
// /Implement tests for the functionality.
test("blog can be deleted", async () => {
  const id = (await api.get("/api/blogs/")).body[0].id;
  await api.delete(`/api/blogs/${id}`).expect(204);
});

//4.14 Blog list expansions, step2
//Implement functionality for updating the information of an individual blog post.
//The application Mostly needs to update the number of likes for a blog post.
//Implement tests for the functionality.
test("blog post can be updated", async () => {
  const id = (await api.get("/api/blogs/")).body[0].id;
  const updates = {
    likes: 42,
  };
  await api.put(`/api/blogs/${id}`).send(updates);
  const result = (await api.get("/api/blogs/")).body[0].likes;
  expect(result).toEqual(42);
});
