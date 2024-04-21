// This is your test secret API key.
const userModel = require('../models/UserModel');
const planModel = require('../models/planModel');
const { SK } = require('../secret');
const stripe = require('stripe')(SK);

module.exports.createsession=async function createsession(req,res){
    try{
        const user_id=req.id;
        const plan_id=req.params.id;
        const user=await userModel.findById(user_id);
        const plan=await planModel.findById(plan_id);
        const session = await stripe.checkout.sessions.create({
            payment_method_types:"card",
            customer_email:user.email,
            client_reference_id:plan.id,
            line_items: [
                {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    name:plan.name,
                    amount:plan.price*100,
                    currency:"inr",
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.protocol}://${req.hostname}:/plan`,
            cancel_url: `${req.protocol}://${req.hostname}:/plan`
        });
        res.redirect(303, session.url);
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}
