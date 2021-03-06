/*
Combines getWeather and getLocation and is responsible for the routes. 
This could be devided more but as the project is small, it would be absurd.
*/
module.exports = function(app, request){
	var location = require("./getLocation");
	var weather = require("./getWeather");
	var image = require("./getImage");
	
	
	//HTTP get on /address. parameter "?address='address'"
	app.get("/address/", function(req, res){
		res.setHeader('Content-Type', 'application/json');
		
		if(req.query.address){
			parseWeather(req.query.address).then(function(response){
				res.send(response);
			}).catch(function(rejected){
				res.status(406).send(rejected);
			});
			
		} else{
			res.status(400).send("Wrong query");
		}
	});
	
	//HTTP get on /geo. parameter "?lat='latitude'&lon='longitude'"
	app.get("/geo/", function(req, res){
		res.setHeader('Content-Type', 'application/json');
		
		if(req.query.lat && req.query.lon){
			parseWeatherGeo(req.query.lat, req.query.lon).then(function(response){
				res.send(response);
			});
		} else{
			res.status(400).send("Wrong query");
		}
	});
	
	//HTTP get on /image. Will return a random image.
	app.get("/image/", function(req, res){
		res.setHeader('Content-Type', 'text/plain');
		
		image.getImage(request).then(function(response){
			console.log(response);
			res.send(response);
		});
	});
	
	
	//Parse the weather when an address is given.
	function parseWeather(address){
		return new Promise(function(fulfilled, rejected){
			var lat;
			var lon;
			
			var result = {response:[]};
			
			//Nice nesteling
			location.getGeoLocation(request, address).then(function(response){
				//First stringify and then substring.
				lat = JSON.stringify(response.lat).substring(0, 7);
				lon = JSON.stringify(response.lng).substring(0, 7);

				weather.getGeoWeather(request, lat, lon).then(function(response){
					var serie = response.timeSeries;
					
					/*
					WANTED RESPONSE
					{response: [
							{date: "",
							 coldest: "",
							 warmest: "",
							 temperature: [
								 {time: "", temp: ""},
								 {time: "", temp: ""},
								 {time: "", temp: ""}
							 ]},
							 {date: "",
							 coldest: "",
							 warmest: "",
							 temperature: [
								 {time: "", temp: ""},
								 {time: "", temp: ""},
								 {time: "", temp: ""}
							 ]}
					]}*/
					
					var coldest = serie[0].parameters[1].values[0];
					var warmest = serie[0].parameters[1].values[0];
					var temperature = [];
					
					for(var i = 0; i < serie.length; i++){
						var date;
						
						//If new date dont is same day as past iteration
						if(i != 0 && new Date(serie[i].validTime).toLocaleDateString() != date.toLocaleDateString()){
							console.log("new object");
							var object = {"date": date.toLocaleDateString(),
														"coldest": coldest,
														"warmest": warmest,
														"temperatures": temperature};
							
							result.response.push(object);
							//reset some variables.
							temperature = [];
							coldest = serie[i].parameters[1].values[0];
							warmest = serie[i].parameters[1].values[0];
						}
						
						var temp = serie[i].parameters[1].values[0];
						
						//Set coldest/warmest
						if(temp < coldest){
							coldest = temp;
							
						}else if(temp > warmest){
							warmest = temp;
						
						}
						
						date = new Date(serie[i].validTime);
						var tempObject = {"time": date.toLocaleTimeString(), "temp": temp};
						
						temperature.push(tempObject);
						
						//var object = date.toLocaleDateString{"time":date.toLocaleTimeString, 
						//							"temperature":serie[i].parameters[1].values[0]};
						
					}
					/*
					Old solution
					for(var i = 0; i < serie.length; i++){
						var object = {};
						object[serie[i].validTime] = serie[i].parameters[1];
						result.push(object);
					}*/
					
					//Returns an array of json objects
					console.log(result);
					
					if(result.length == 0){
						rejected(result);
					} else{
						fulfilled(result);
					}
				}).catch(function(exep){
					rejected(exep);
				});
			}).catch(function(exep){
				rejected(exep);
			});
			
		});
	}
	
	//Parse the weather when a latitude and a longitude is given.
	function parseWeatherGeo(lat, lon){
		
		return new Promise(function(fulfilled, rejected){
			
			lat = lat.substring(0, 7);
			lon = lon.substring(0, 7);
			console.log(lat, lon);
			
			var result = {response:[]};
			
			weather.getGeoWeather(request, lat, lon).then(function(response){
				var serie = response.timeSeries;
				var coldest = serie[0].parameters[1].values[0];
				var warmest = serie[0].parameters[1].values[0];
				var temperature = [];

				for(var i = 0; i < serie.length; i++){
					var date;

					//If new date dont is same day as past iteration
					if(i != 0 && new Date(serie[i].validTime).toLocaleDateString() != date.toLocaleDateString()){
						var object = {"date": date.toLocaleDateString(),
													"coldest": coldest,
													"warmest": warmest,
													"temperatures": temperature};

						result.response.push(object);
						
						//reset some variables.
						temperature = [];
						coldest = serie[i].parameters[1].values[0];
						warmest = serie[i].parameters[1].values[0];
					}

					var temp = serie[i].parameters[1].values[0];

					//Set coldest/warmest
					if(temp < coldest){
						coldest = temp;

					}else if(temp > warmest){
						warmest = temp;

					}

					date = new Date(serie[i].validTime);
					var tempObject = {"time": date.toLocaleTimeString(), "temp": temp};

					temperature.push(tempObject);
				}
				//Returns an array of json objects
				console.log(result);

				if(result.length == 0){
					rejected(result);
				} else{
					fulfilled(result);
				}
			});
			
		});
	}
};



