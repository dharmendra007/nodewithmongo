require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Success");
})

// api routes
app.use('/agencyClient', require('./agencyClient/agencyClient.controller'));

// global error handler
app.use(errorHandler);

// start server
// const port = 3000;
// const server = app.listen(port, function() {
//     console.log('Server listening on port ' + port);
// });

var server_port = 3000;

var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});