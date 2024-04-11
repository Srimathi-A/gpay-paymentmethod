const express=require=require("express");
const app=express();

const stripe=require("stripe") (
  "sk_test_51P1fxXSHs0KSNO6tYxHvREiLW9YccNrPMNEWivLZJ0lc8XsaTc6lY9VNEp4VkNnOW6NhCKO5Q20pDObllwv0SYho00wzH9Ol70"
);

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount=items=>{
    return 3000;
};

app.post("/create-payment-intent",async(req,res)=>{
    const {items} =req.body;

    const paymentIntent=await stripe.paymentIntents.create({
        amount:calculateOrderAmount(items),
        currency:"inr",
        statement_description_suffix:"payment using Stripe",
        automatic_payment_methods:{
            enabled:true
        }
    });

    res.send({
        clientSecret:paymentIntent.client_secret
    });
});
app.get("/success",(req,res)=>{
    res.send("payment successfull! thankyou for your purchase.");
});
app.get("/canceled",(req,res)=>{
    res.send("payment canceled.your order was not processed.");
});
app.listen(4242,()=>console.log("node server listening on port 4242!"));