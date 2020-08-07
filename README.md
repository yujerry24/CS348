# CS348

## Setup Instructions:

1. Make sure that you have Node.js installed.
2. In a terminal run
   a) `npm install`
   b) `node index.js` or `npm start`
3. Next, go to the cs348-frontend folder to run the frontend

## Brief Technology Stack Explanation

We run a PostgresSQL database on Google Cloud Platform.
With the public IP and credentials set up, we run a dedicated server with `index.js` which is responsible for communicating with the database.
This server has endpoints set up which our client side `app.js` can make http requests to get the database information.
