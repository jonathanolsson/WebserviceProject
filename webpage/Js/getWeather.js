$(function (){
	function loadDoc() {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.log(this.responseText);
				document.getElementById("test").innerHTML = this.responseText;
			}
		};
		xhttp.open("GET", "http://localhost:3000/?address=edsbyn", true);
		xhttp.send();
	}
});