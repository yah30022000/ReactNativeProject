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
	API_ID
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


/****************************
* Example post method *
****************************/

amadeus.shopping.hotelOffers.get({
  cityCode: 'LON'
}).then(function (hotels) {
  return amadeus.shopping.hotelOffersByHotel.get({
    'hotelId': hotels.data[0].hotel.hotelId,
    'checkInDate': '2022-11-21',
    'checkOutDate': '2022-11-22'
  });
}).then(function (hotelOffers) {
  return amadeus.shopping.hotelOffer(hotelOffers.data.offers[0].id).get();
}).then(function (pricingResponse) {
  return amadeus.booking.hotelBookings.post(
    JSON.stringify({
      'data': {
        'offerId': pricingResponse.data.offers[0].id,
        'guests': [{
          'id': 1,
          'name': {
            'title': 'MR',
            'firstName': 'BOB',
            'lastName': 'SMITH'
          },
          'contact': {
            'phone': '+33679278416',
            'email': 'bob.smith@email.com'
          }
        }],
        'payments': [{
          'id': 1,
          'method': 'creditCard',
          'card': {
            'vendorCode': 'VI',
            'cardNumber': '4151289722471370',
            'expiryDate': '2027-08'
          }
        }]
      }
    }));
}).then(function (response) {
  console.log(response);
}).catch(function (response) {
  console.error(response);
});


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
