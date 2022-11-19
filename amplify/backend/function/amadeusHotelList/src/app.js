/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});


app.get("/amadeus/hotel-list", async function(req, res) {

  try {
    // check request params
    console.log("GET /amadeus/hotel-list: ", req.query);

    let response = await amadeusInstance.referenceData.locations.hotels.byCity.get(
      req.query
    )
    // if (!response.ok) {
    //   throw new Error("failed to call /v1/reference-data/locations/hotels/by-city");
    // }
    let body = JSON.parse(response.body);
    console.log("hotelList: ", body);

    res.json({ status: 200, data: body.data });
  } catch (err) {
    res.status(500).send({ err });
  }
});


app.listen(3000, function() {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
