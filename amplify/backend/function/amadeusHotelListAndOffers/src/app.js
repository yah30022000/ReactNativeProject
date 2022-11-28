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
let Amadeus = require("amadeus");

let amadeusInstance = new Amadeus({
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


app.get("/amadeus/hotel-list-and-offers", async function(req, res) {

  console.log("GET /amadeus/hotel-list-and-offers: ", req.query);

  try {


    // check request params
    if(!req.query.cityCode || !req.query.adults){
      throw new Error ("missing query params: cityCode or adults")
    }

    let hotelListRequest = {
      cityCode: req.query.cityCode,
      radius: !req.query.radius ? undefined : parseInt(req.query.radius),
      radiusUnit: req.query.radiusUnit ?? undefined,
      chainCodes: req.query.chainCodes ?? undefined,
      amenities: req.query.amenities ?? undefined,
      ratings: req.query.ratings ?? undefined,
      hotelSource: req.query.hotelSource ?? undefined,
    }

    let hotelListResponse = await amadeusInstance.referenceData.locations.hotels.byCity.get(hotelListRequest);
    let hotelListResponseBody = JSON.parse(hotelListResponse.body);
    console.log("hotelListResponseBody: ", hotelListResponseBody);

    let hotelIds = hotelListResponseBody.data.map((hotel)=>{
      return hotel.hotelId
    })

    let hotelOffersRequest = {
      hotelIds: JSON.stringify(hotelIds),
      adults: parseInt(req.query.adults),
      checkInDate: !req.query.checkInDate || req.query.checkInDate === '' ? undefined : req.query.checkInDate,
      checkOutDate: !req.query.checkOutDate || req.query.checkOutDate === '' ? undefined : req.query.checkOutDate,
      countryOfResidence: req.query.countryOfResidence ?? undefined,
      roomQuantity: !req.query.roomQuantity ? undefined : parseInt(req.query.roomQuantity),
      priceRange: req.query.priceRange ?? undefined,
      currency: req.query.currency ?? undefined,
      paymentPolicy: req.query.paymentPolicy ?? undefined,
      boardType: req.query.boardType ?? undefined,
      includeClosed: req.query.includeClosed ?? undefined,
      bestRateOnly: req.query.bestRateOnly ?? undefined,
      lang: req.query.lang ?? undefined,
    }

    console.log('hotelOffersRequest: ', hotelOffersRequest)

    let hotelOffersResponse = await amadeusInstance.shopping.hotelOffersSearch.get(hotelOffersRequest)
    console.log("hotelOffersResponseBody: ", hotelOffersResponse.data);

    let hotelOffersWithRating = hotelOffersResponse.data.map((response) => {
      let rating = hotelListResponse.data.find((lResponse)=>lResponse.hotelId === response.hotel.hotelId)?.rating ?? undefined
      response.hotel["rating"] = rating

      let amenities = hotelListResponse.data.find((lResponse)=>lResponse.hotelId === response.hotel.hotelId)?.amenities ?? undefined
      response.hotel["amenities"] = amenities

      return response;
    })

    res.json({ status: 200, data: hotelOffersWithRating });
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
