/*
This is where the location is handled.
The call to google is made inside "getGeoLocation()".
*/

module.exports = {
	//Get geo location from google maps api.
	getGeoLocation : function(request, address){
		
		return new Promise(function(fulfilled, rejected){
			var path = "https://maps.googleapis.com/maps/api/geocode/json?address="+
					address+"&key=AIzaSyAaDxZjj8y1G4VGnmcQTJQq76Ooq8xY2j8";
			
			request(path, function (err, res, body) {
				if(err !== null){
					rejected(err);
				} else{
					try{
						var result = JSON.parse(body);
						fulfilled(result.results[0].geometry.location);
					} catch(exep){
						rejected(exep);
					}
				}
				
			});
		});
		
	}
};