$(function (){
	getGeo();
	
	document.getElementById("activateBtn").addEventListener("click", search, false);
	
	function search(){
		var xhttp = new XMLHttpRequest();
		var response;
		
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				response = this.responseText;
			}
		};
		
		xhttp.open("GET", "http://localhost:3000/?address="+address, false);
		xhttp.send();
		
		printWeather(response);
	}
	
	
	function getGeo(){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position){
				var lat = position.coords.latitude; 
				var lon = position.coords.longitude;
				geoLocation(lat, lon);
			});
			
		} else { 
			document.getElementById("activateBtn").innerHTML = "Geolocation is not supported by this browser.";
		}
	}
	
	function getLocation(lat, lon){
		var xhttp = new XMLHttpRequest();
		var response;
		
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				response = this.responseText;
			}
		};
		
		xhttp.open("GET", "http://localhost:3000/geo/?lat="+lat+"&lon="+lon, false);
		xhttp.send();
		
		printWeather(response);
	}
	
	/*
	function getWeather() {
		var xhttp = new XMLHttpRequest();
		var response;
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				response = this.responseText;
			}
		};
		
		xhttp.open("GET", "http://localhost:3000/address/?address=sundsvall", false);
		xhttp.send();
		printWeather(response);
	}
	*/
	
	function printWeather(weather){
		weather = JSON.parse(weather);
		
		document.getElementById("weatherList").innerHTML = "";
		
		for(var i = 0; i < weather.response.length; i++){
			console.log(weather.response[i]);
			
			var date = new Date(weather.response[i].date);
			var coldest = weather.response[i].coldest;
			var warmest = weather.response[i].warmest;
			
			var li = document.createElement("li");
			var div = document.createElement("div");

			var divDate = document.createElement("div");
			var divWarmest = document.createElement("div");
			var divColdest = document.createElement("div");

			div.setAttribute("class", "row");

			divDate.setAttribute("class", "col s4");
			divWarmest.setAttribute("class", "col s4");
			divColdest.setAttribute("class", "col s4");
			
			if(i == 0){
				divDate.innerHTML = "<h4>Today</h4>";
				divWarmest.innerHTML = "<h4>" + coldest + "</h4>";
				divColdest.innerHTML = "<h4>" + warmest + "</h4>";
				
				li.setAttribute("class", "collection-header");
				
			}else{
				divDate.innerHTML = date.getDate() + '/' + (date.getMonth()+1);
				divWarmest.innerHTML = coldest;
				divColdest.innerHTML = warmest;
				
				li.setAttribute("class", "collection-item");
			}
			
			div.appendChild(divDate);
			div.appendChild(divWarmest);
			div.appendChild(divColdest);
			li.appendChild(div);

			document.getElementById("weatherList").appendChild(li);
		}
	}
	
	
	
	//init
 	$('.collapsible').collapsible();
	
	
})