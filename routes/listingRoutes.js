const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const methodOverride = require("method-override");
const {listingSchema} = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLoggedIn, isOwner, validateListingNew, validateListingEdit} = require("../middlewares.js");

const listingController = require("../Controllers/listing.js")
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
    // index route
    .get(wrapAsync(listingController.index))
    // create route
    .post(isLoggedIn, upload.single('listing[image]'), validateListingNew, wrapAsync(listingController.createListing));

// New route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    // show route
    .get(wrapAsync(listingController.showListing))
    // update route
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListingEdit, wrapAsync(listingController.updateListing))
    // delete route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;