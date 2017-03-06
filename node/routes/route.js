module.exports = function(app, request){
	var location = require("./getLocation");
	var weather = require("./getWeather");
	
	app.get("/", function(req, res){
		
		parseWeather(req.query.address).then(function(response){
			//console.log(response);
			res.send(response);
		});
	});
	
	function parseWeather(address){
		return new Promise(function(fullfilled, rejected){
			var lat;
			var lon;
			
			var result = {};
			
			//Nice nesteling
			location.getGeoLocation(request, address).then(function(response){
				//First stringify and then substring.
				lat = JSON.stringify(response.lat).substring(0, 7);
				lon = JSON.stringify(response.lng).substring(0, 7);

				weather.getGeoWeather(request, lat, lon).then(function(response){
					var serie = response.timeSeries;

					for(var i = 0; i < serie.length; i++){
						result[serie[i].validTime] = serie[i].parameters[1];
					}
					//console.log(result);
					
					if(result == '{}'){
						rejected(result);
					} else{
						fullfilled(result);
					}
				});
			});
			
		});
	}
};
























