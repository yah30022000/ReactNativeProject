/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	client_id
	client_secret
Amplify Params - DO NOT EDIT */

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
let amadeus = require("amadeus");

let amadeusInstance = new amadeus({
  clientId: process.env.client_id,
  clientSecret: process.env.client_secret,
});

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded());
app.use(express.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


app.post("/amadeus/hotel-bookings", async function(req, res) {

  console.log("POST /amadeus/hotel-bookings: ", req.body);

  try {

    /* check request params starts */

    // offerId
    if(!req.body.data.offerId){
      throw new Error ("missing body params: offerId")
    };

    // guests array
    if(!req.body.data.guests || req.body.data.guests.length < 1){
      throw new Error ("missing body params: guests")
    }else if(!req.body.data.guests[0].name.title ||
      !req.body.data.guests[0].name.firstName ||
      !req.body.data.guests[0].name.lastName
    ){
      throw new Error ("missing body params: title/firstName/lastName")
    }else if (!req.body.data.guests[0].contact.phone ||
      !req.body.data.guests[0].contact.email
    ){
      throw new Error ("missing body params: phone/email")
    }

    if(!req.body.data.payments || req.body.data.payments.length < 1){
      throw new Error ("missing body params: payments")
    }else if (!req.body.data.payments[0].method ||
      !req.body.data.payments[0].card.vendorCode ||
      !req.body.data.payments[0].card.cardNumber ||
      !req.body.data.payments[0].card.expiryDate
    ){
      throw new Error ("missing body params: method/vendorCode/cardNumber/expiryDate")
    }

    /* check request params ends */

    let hotelBookingRequest = req.body

    console.log('hotelBookingRequest: ', hotelBookingRequest)

    let hotelBookingResponse = await amadeusInstance.booking.hotelBookings.post(
      JSON.stringify(hotelBookingRequest)
    )

    console.log("hotelBookingResponse: ", hotelBookingResponse.data);

    res.json({ status: 200, data: hotelBookingResponse.data });
  } catch (err) {
    res.status(500).send({error: err.message});
  }
});


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
