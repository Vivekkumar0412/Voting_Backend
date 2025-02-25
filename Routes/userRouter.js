const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");
const testModel = require("../Models/testModel");
const { generateJwtToken, verifyJwtTokenMiddleware } = require("../jwt");
const { json } = require("body-parser");
router.post("/signup", async function (req, res) {
  try {
    let data = req.body;
    console.log(req.body, "req.body");
    let response = await User(data);
    await response.save();
    const payLoad = {
      id: response.id,
    };
    console.log(payLoad, "payLoad");
    const token = generateJwtToken(payLoad);
    res.status(200).json({ data: response, token: token });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});
router.post("/test", async (req, res) => {
  try {
    const data = req.body;
    const response = await testModel(data);
    await response.save();
    res.status(200).json({ msg: response });
  } catch (error) {
    res.status(404), json(error);
  }
});

router.post("/login", async function (req, res) {
  try {
    const { adharNumber, password } = req.body;
    const user = await User.findOne({ adharNumber: adharNumber });
    console.log(user,"user")
    if (!user) {
      res.status(404).json({ msg: "user not found !!" });
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      res.status(404).json({ msg: "password is incorrect !!!" });
    }
    const payLoad = {
      id: user.id,
    };

    const token = generateJwtToken(payLoad);
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(400).json({ msg: "Some error at backend ~!!" });
  }
});

router.get("/profile", verifyJwtTokenMiddleware, async function (req, res) {
  try {
    const data = req.decodedData;
    id = data.id;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ msg: "user not found !!" });
    }
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(404).json({ msg: "no user found !!!" });
  }
});

router.get("/", verifyJwtTokenMiddleware, async function (req, res) {
  try {
    const data = await User.find();
    res.status(200).json({ user: data });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
});

router.put(
  "/profile/password",
  verifyJwtTokenMiddleware,
  async function (req, res) {
    try {
      const userData = req.decodedData;
      const userId = userData.id;
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ msg: "No user found !!" });
      }
      const { currentPassword, newPassword } = req.body;
      const isMatchPassword = user.comparePassword(currentPassword);
      if (!isMatchPassword) {
        res.status(404).json({ msg: "Inavlid password" });
      }

      user.password = newPassword;
      await user.save();
      res.status(200).json("password updated !!!");
    } catch (error) {
      res.status(404).json("some error occured at backend !!!");
    }
  }
);

module.exports = router;
