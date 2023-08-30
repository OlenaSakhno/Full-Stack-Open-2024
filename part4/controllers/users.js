const usersRouter = require("express").Router();
const User = require("../models/user");

const bcrypt = require("bcrypt");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  try {
    if (name && password && username) {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      if (username.length <= 3 || password.length <= 3) {
        response
          .status(400)
          .json({ error: "username or/and password shorter than 3" });
      } else {
        const user = new User({
          username,
          name,
          passwordHash: passwordHash,
        });
        const result = await user.save();
        response.status(201).json(result);
      }
    }
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { url: 1 });
  response.json(users);
});

module.exports = usersRouter;
