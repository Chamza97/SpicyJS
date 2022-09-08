const express = require("express");
const router = express.Router();

//import controller
const {
  signup,
  accountActivation,
  signin,
  googleLogin,
} = require("../controllers/auth");

//import validators
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/auth");
const { runValidation } = require("../validators/index");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/account-activation", accountActivation);
router.post("/signin", userSigninValidator, runValidation, signin);

//google
router.post("/google-login", googleLogin);

module.exports = router;
