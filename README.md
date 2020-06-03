# CS348

## Setup Instructions:

1. Make sure that you have Node.js installed.
2. On a seperate terminal, go to the `backend` folder
	a) Run `npm install`
	b) Run `node index.js`
3. On another terminal, go to the `cs348-frontend` folder
	a) Run `npm install`
	b) Run `npm start`
4. Next, go to your web browser and navigate to https://localhost:3000
5. You will see a table with filler data
6. Click on the button to get the database data


## Brief Technology Stack Explanation
We run a PostgresSQL database on Google Cloud Platform. With the public IP and credentials set up, we run a dedicated server with `index.js` which is responsible for communicating with the database. This server has endpoints set up which our client side `app.js` can make http requests to get the database information.