const express=require("express");
const { protectRoute, isAuthorised } = require("../controller/authController");
const { getAllPLans, getplan, createPlan, updatePlan, deletePlan, topplan} = require("../controller/planController");
// const app=express();
const planRouter=express.Router();

planRouter.route("/getallplans")
.get(getAllPLans)

planRouter.route("/top/:id")
.get(topplan)

planRouter.use(protectRoute)
planRouter.route("/getplan/:id")
.get(getplan)

planRouter.use(isAuthorised(["admin","restaurantowner"]));
planRouter.route("/crudplan")
.put(createPlan)

planRouter.route("/crudplan/:id")
.patch(updatePlan)
.delete(deletePlan)

module.exports=planRouter