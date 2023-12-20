const express=require("express");
const router =express.Router();
const wrapAsync=require("../util/wrapAsync.js");
const Listing =require("../models/listing.js");
const {isLoggedIn ,isOwner, validateListing}=require("../middleware.js");
const listingController =require("../controllers/listing.js");
const multer=require("multer");
const{storage}=require("../cloudConfig.js");
const upload= multer({storage});


//Index Route
router.get("/",wrapAsync(listingController.index));

// New Route
router.get("/new", isLoggedIn,listingController.renderNewForm);
 
 //Show Route
router.get("/:id",wrapAsync(listingController.showListing));
 
//create Route
 router.post("/",isLoggedIn,upload.single("listing[image]"),wrapAsync(listingController.createListing));

//edit route
router.get("/:id/edit", isLoggedIn, isOwner,wrapAsync(listingController.renderEditForm));

//upadate route
router.put("/:id",isLoggedIn, isOwner,upload.single("listing[image]"),wrapAsync(listingController.updateListing));
 
//delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));
 module.exports =router;