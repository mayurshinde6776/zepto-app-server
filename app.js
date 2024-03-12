const express = require("express");
const stripe = require("stripe")('sk_test_51OYoZhSEOKoo6wPz0cAyIJGqQSXB0VHnRT9EcpJ0yH2SBkRlqDQcpPf2hPKM8lAG9vtngpp2HLviizKA17p0jZAi006clODVIx');
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

//checkout api

app.post("/api/create-checkout-session", async (req, res) => {
    const  {products} = req.body;
  //  console.log(products);
    const lineItems = products.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.rname
            },
            unit_amount: product.price * 100,
        },
        quantity: product.qnty
    }));

    

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    res.json({ id: session.id });
});




app.listen(7000, () => {
    console.log("server running");
})