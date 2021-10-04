const router = require("express").Router();
const { request } = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../../models");

// CREATE new user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      email: req.body.email,
      username: req.body.username,
      fname: req.body.fname,
      lname: req.body.lname,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.id = userData.id;
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

  if (!dbUserData) {
    res.status(400).json({ message: "User profile not created" });
    return;
  }
});

router.put("/", async (req, res) => {
  try {
    let profileData = {
      email: req.body.email,
      username: req.body.username,
      fname: req.body.fname,
      lname: req.body.lname,
    };

    if (req.body.password) {      
      profileData["password"] = req.body.password;
    }

    // to call before update hook
    const profile = await User.findOne({
      where: { id: req.session.user_id }
    });
    const updatedProfile = await profile.update(profileData);

    console.log(updatedProfile);
    res.status(200).json({ message: "Profile updated!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
      return;
    }

    console.log(dbUserData.id);
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
