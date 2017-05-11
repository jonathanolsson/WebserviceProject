$(function (){
	getImage();
	getGeo();
	addNote()
	
	document.getElementById("searchBtn").addEventListener("click", search, false);
	document.getElementById("addNoteBtn").addEventListener("click", addNote, false);
	
	//Function to search for weather of a certain address, such as "sundsvall".
	function search(){
		var xhttp = new XMLHttpRequest();
		var response;
		var address = document.getElementById("address").value;
		console.log(address);
		
		if(address != undefined || address != ""){
			console.log(address);
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					response = this.responseText;
				}
			};

			xhttp.open("GET", "http://localhost:3000/address/?address="+address, false);
			xhttp.send();

			printWeather(response);
		}
	}
	
	//Get geo location from HTML 5.
	function getGeo(){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position){
				var lat = position.coords.latitude; 
				var lon = position.coords.longitude;
				getLocation(lat, lon);
			});
			
		} else { 
			document.getElementById("inputfield").value = "Geolocation is not supported by this browser.";
		}
	}
	
	//Get geo location from server.
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
	
	//Print the weather to a list with DOM.
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

	//Gets image from API
	function getImage(){
			var xhttp = new XMLHttpRequest();
			var response;

			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					response = this.responseText;
				}
			};

			xhttp.open("GET", "http://localhost:3000/image/", false);
			xhttp.send();
			
			displayImage(response);
	}
	
	//Displays the image
	function displayImage(url){
		document.getElementById("onTop").style.backgroundImage = "url(\""+url+"\")";
		
	}
	
	
	function addNote(){
		var li = document.createElement("li");
		var input = document.createElement("input");
		var removeIcon = document.createElement("i");
		
		li.setAttribute("class", "row collection-item");
		input.setAttribute("type", "text");
		input.setAttribute("class", "col s10");
		
		removeIcon.setAttribute("class", "clickable material-icons small col s2");
		removeIcon.addEventListener("click", deleteNote, false);
		removeIcon.style.marginTop = "16px";
		removeIcon.innerHTML = "close";
				
		li.appendChild(input);
		li.appendChild(removeIcon);
		
		document.getElementById("noteList").appendChild(li);
	}
	
	function deleteNote(){
		document.getElementById("noteList").removeChild(this.parentNode);
	}
	
	//init
 	$('.collapsible').collapsible();
  
})