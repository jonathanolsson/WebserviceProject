module.exports = {
	getImage : function(request){
			return new Promise(function(fulfilled, rejected){
				var path = "https://source.unsplash.com/category/nature/1600x900/";
				
				fulfilled(path);
				/*
				request(path, function(err, res, body){
					if(err !== null){
						rejected(err);
					}else{
						fulfilled(body);
					}
				});
				*/
			});
	}
}