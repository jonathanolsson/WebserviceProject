/*
This is where the weather is catched from the SMHI api.
Longitude and latitude is required.
*/
module.exports = {
	getGeoWeather : function(request, lat, lon){
		return new Promise(function(fulfilled, rejected){	
			var path = "http://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/"+lon+"/lat/"+lat+"/data.json";
			var result;
				
			request(path, function(err, res, body){
				
				if(err !== null){
					rejected(err);
				}else{
					try{
						var result = JSON.parse(body);
						fulfilled(result);
						
					}catch(exep){
						rejected(exep);
					}
				}
			});
		});
	}
};