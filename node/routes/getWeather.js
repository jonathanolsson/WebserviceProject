module.exports = {
	getGeoWeather : function(request, lat, lon){
		return new Promise(function(fullfilled, rejected){
			
			var path = "http://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/"+lon+"/lat/"+lat+"/data.json"
			var result;
			
			console.log("Lat:", lat);
			console.log("Lon:", lon);
			
			request(path, function(err, res, body){
				
				if(err !== null){
					rejected(err);
				}else{
					//console.log("BODY", body);
					
					var result = JSON.parse(body);
					fullfilled(result);
				}
				
			});
			
		});
	}
};