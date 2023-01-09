const functions = require("firebase-functions");
const express=require("express");
const cors=require("cors");
const { response } = require("express");
const stripe=require("stripe")('sk_test_51ML5uPSIu4JSwVQPxUfjGfpda5nOOhlziryTZBjEcASP8yLPimTy7oQH8DHwauLESxBGmY4e1sTPDFEozb0l65JU00coIsSqg0');

//API

//App config
const app=express();

//Middlewares
app.use(cors({ origin:true }));
app.use(express.json());

//API Routes
app.get('/',(request, response) =>response.status(200).send('Hello world'))

app.post('/payments/create',async(request,response) =>{
    const total=request.query.total;
    console.log('Payment request received for amount >>> ',total)

    const paymentIntent=await stripe.paymentIntents.create({
        amount: total, //subunit of the currency
        currency: 'usd',
    });
    //OK - Created.send
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

//Listen command
exports.api=functions.https.onRequest(app);

//Example endpoint
//http://127.0.0.1:5001/clone-e804c/us-central1/api


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
