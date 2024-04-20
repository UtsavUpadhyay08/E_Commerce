const express=require("express");
const { getAllreview, topreview, getplanreview, createreview, deletereview, updatereview } = require("../controller/reviewController");
const { protectRoute } = require("../controller/authController");
const reviewRouter=express.Router();

reviewRouter.route("/all")
.get(getAllreview)

reviewRouter.route("/top/:id")
.get(topreview)

reviewRouter.route("/:id")
.get(getplanreview)

reviewRouter.use(protectRoute)
reviewRouter.route("/crud/:plan")
.put(createreview)


reviewRouter.route("/crud/:id")
.patch(updatereview)
.delete(deletereview)

module.exports=reviewRouter;