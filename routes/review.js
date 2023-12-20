const express =require("express");
const router=express.Router({mergeParams: true});
const wrapAsync=require("../util/wrapAsync.js");
const ExpressError=require("../util/ExpressError.js");
const Review =require("../models/review.js");
const Listing =require("../models/listing.js");
const {validateReview ,isLoggedIn,isReviewAuthor}= require("../middleware.js");
const reviewController=require("../controllers/review.js");

//reviews 
//post router
router.post("/", isLoggedIn,validateReview ,wrapAsync(reviewController.createReview)
   );
   //delete review

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview)
   );
   module.exports=router;