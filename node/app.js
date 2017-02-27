const express = require("express");
const app = express();

const routes = require("./routes/route")(app);

app.listen(3000, function(){
	console.log("listening on port 3000...");
});