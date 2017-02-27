

module.exports = function(app){
	function getHome(req, res){
		res.send("Hello from home");
	}
	app.get("/", getHome);
};