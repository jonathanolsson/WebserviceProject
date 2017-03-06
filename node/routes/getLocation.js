/*
This is where the location is handled.
The call to google is made inside "getGeoLocation()".
*/

module.exports = {
	getGeoLocation : function(request, address){
		
		return new Promise(function(fullfilled, rejected){
			var path = "https://maps.googleapis.com/maps/api/geocode/json?address="+
					address+"&key=AIzaSyAaDxZjj8y1G4VGnmcQTJQq76Ooq8xY2j8";
			
			request(path, function (err, res, body) {
				if(err !== null){
					rejected(err);
				} else{
					var result = JSON.parse(body);
					fullfilled(result.results[0].geometry.location);
				}
				
			});
		/*
		var path = "https://maps.googleapis.com/maps/api/geocode/json?address="+
				address+"&key=AIzaSyAaDxZjj8y1G4VGnmcQTJQq76Ooq8xY2j8";
		
		var result;
		request(path, function (error, response, body) {
			if(error !== null){
				return error;
				
			} else{
				result = JSON.parse(body);
				return result.results[0].geometry.location;
			}
			*/
		});
		
	}
};