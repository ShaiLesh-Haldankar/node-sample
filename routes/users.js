const express = require("express");
const userMiddlewares = require("../middlewares/user");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/", userMiddlewares.checkForDuplicateId, async (req, res) => {
  try {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    user = await user.save();
    res.send({ message: "User was registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    let userData;
    await User.findOne(
      {
        email: req.body.email,
      },
      (error, user) => {
        error && res.status(500).send({ user, error });
        userData = user;
      }
    );
    console.log("test", req.body.password, userData.password);
    let checkPassword = bcrypt.compareSync(
      req.body.password,
      userData.password
    );
    if (!checkPassword) {
      res.status(401).send({ success: false, message: "Wrong credentials" });
    }
    res.status(200).send({ success: true, data: userData });
  } catch (error) {
    res.status(500).send(error);
  }
});
