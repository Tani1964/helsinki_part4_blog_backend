const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get('/', async(request, response) => {
  try{
    const users = await User.find({});
  response.json(users)
  // response.json(users);
  }catch(err){
    console.log(err);
  }
  
});

usersRouter.post("/", async (request, response) => {
    const { username, name, password } = request.body;
  
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
  
    const user = new User({
      username,
      name,
      passwordHash,
    });
  
    const savedUser = await user.save();
  
    response.status(201).json(savedUser);
  });

  
  
  module.exports = usersRouter;