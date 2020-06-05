# CS348

## Setup Instructions:

1. Make sure that you have Node.js installed.
2. In a terminal run  <br />
	a) 'npm install` <br />
	b) `node index.js` or `npm start` <br />
3. Next, go to your web browser and navigate to https://localhost:3000
4. You will see a table with filler data
5. Click on the button to get the database data


## Brief Technology Stack Explanation
We run a PostgresSQL database on Google Cloud Platform. With the public IP and credentials set up, we run a dedicated server with `index.js` which is responsible for communicating with the database. This server has endpoints set up which our client side `app.js` can make http requests to get the database information.
