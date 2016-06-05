//-------------------//
//     Requests      //
//-------------------//

// function getInitialModel()
// {
// 	sendRequest("get_modul.php", initialize);
// }

//function getTestResponse()
//{
//	sendRequest("/test/PhotoCountry/php/test_request.php", testCallback);
//}

//-------------------//
// Success Callbacks //
//-------------------//

function testCallback(responseText)
{
	console.log(JSON.parse(responseText));
	ANSWER = JSON.parse(responseText);
	localStorage.setItem("actionsData", JSON.stringify(ANSWER));
	askForInfo.workWithInfo(ANSWER.data);
	countAllTaps = ANSWER.current_score;

}


// AJAX request helper
function sendRequest(url, successCallback)
{
	var xhttp;

	if (window.XMLHttpRequest)
		xhttp = new XMLHttpRequest();
	else // code for IE6, IE5
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");

	xhttp.onreadystatechange = function()
	{
	
		if (xhttp.readyState == 4 && xhttp.status == 200)
			successCallback(xhttp.responseText);
	};

	xhttp.open("GET", url, true);
	xhttp.send();
}