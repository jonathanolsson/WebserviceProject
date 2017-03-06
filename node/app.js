const express = require("express");
const request = require("request");
const cors = require("cors");

const app = express();
app.use(cors());

const routes = require("./routes/route")(app, request);
/*
	app.get("/", function(req, res){
		request("api.genius.com/search?q=Kendrick%20Lamar", function(err, res, body){
			if (!err && res.statusCode == 200) {
				console.log(body); // Show the HTML for the Google homepage. 
			}else{
				console.log(err);
			}
		});
	});
*/

app.listen(3000, function(){
	console.log("listening on port 3000...");
});