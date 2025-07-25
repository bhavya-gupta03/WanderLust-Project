const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router({mergeParams: true});
const User = require("../models/user");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares");

const userController = require("../Controllers/users");
const { render } = require("ejs");
const { route } = require("./listingRoutes");

router.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

router.route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), userController.login);

router.get("/logout", userController.logout);

module.exports = router;