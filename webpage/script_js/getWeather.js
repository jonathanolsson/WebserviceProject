$(function (){	
	document.getElementById("activateBtn").addEventListener("click", printWeather, false);
	
	printWeather();
	
	
	function getWeather() {
		var xhttp = new XMLHttpRequest();
		var response;
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				response = this.responseText;
			}
		};
		xhttp.open("GET", "http://localhost:3000/?address=sundsvall", false);
		xhttp.send();
		return response;
	}
	
	
	function printWeather(){
		//Is JSON.parse necessary?
		var weather = JSON.parse(getWeather());
		
		document.getElementById("weatherList").innerHTML = "";
		
		for(var i = 0; i < weather.response.length; i++){
			console.log(weather.response[i]);
			
			var date = new Date(weather.response[i].date);
			var coldest = weather.response[i].coldest;
			var warmest = weather.response[i].warmest;
			/*
			<li class="collection-item">						
					<div class="row">
						<div class="col s4">
							<h4>Väder idag</h4>
						</div>
						<div class="col s4">
							<h4>Väder idag</h4>
						</div>
						<div class="col s4">
							<h4>Väder idag</h4>
						</div>
					</div>
			</li>
			*/
			
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
		
		/*
		weather.response.forEach(function(item){
			console.log(item);
			var date = item.date;
			var coldest = item.coldest;
			var warmest = item.warmest;
			*/
			/*
			<li class="collection-item">						
					<div class="row">
						<div class="col s4">
							<h4>Väder idag</h4>
						</div>
						<div class="col s4">
							<h4>Väder idag</h4>
						</div>
						<div class="col s4">
							<h4>Väder idag</h4>
						</div>
					</div>
			</li>
			*/
		/*
			document.getElementById("weatherList").appendChild(li);

			
			var li = document.createElement("li");
			var div = document.createElement("div");
			
			var divDate = document.createElement("div");
			var divWarmest = document.createElement("div");
			var divColdest = document.createElement("div");
			
			li.setAttribute("class", "collection-item");
			div.setAttribute("class", "row");
			
			divDate.setAttribute("class", "col s4");
			divWarmest.setAttribute("class", "col s4");
			divColdest.setAttribute("class", "col s4");
			
			divDate.innerHTML = date;
			divWarmest.innerHTML = coldest;
			divColdest.innerHTML = warmest;
			
			div.appendChild(divDate);
			div.appendChild(divWarmest);
			div.appendChild(divColdest);
			li.appendChild(div);
			
			document.getElementById("weatherList").appendChild(li);
		});
		*/
	}
	
	
	
	//init
 	$('.collapsible').collapsible();
	
	
})