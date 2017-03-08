const express = require("express");
const request = require("request");
const cors = require("cors");

const app = express();
app.use(cors());

const routes = require("./routes/route")(app, request);

app.listen(3000, function(){
	console.log("listening on port 3000...");
});