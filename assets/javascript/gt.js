var gifs = ["basketball", "baseball"]; //- seed gifs
var offset = 0; //- paging option
var lastButton = "";

$("#add-gif").on("click", function (event){
	event.preventDefault(); //- this is necessary or array.push will not work 
	var gif = $("#gif-add").val().trim();
	console.log(gif);

//- check to make sure the string does not exist and the input is not blank before adding
	if (gifs.indexOf(gif) === -1 && gif !== "") {
		gifs.push(gif);
	}

	$("#gif-add").val(""); // empty the input so the string does not persists
	addGifButtons();
});

function addGifButtons() {
	$(".the-buttons").empty();
	for (i=0 ; i<gifs.length; i++) {
		var addButton = $("<button>");
		$(".the-buttons").append(addButton);
		addButton.addClass("gif");
		addButton.attr("data-name", gifs[i]);
		addButton.text(gifs[i]);

        }
	}

function fetch() {
	// var queryURL = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=40e9cece";
	// var queryURL = "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC"
	var fetchItem = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + fetchItem.replace(" ", "+") + "&api_key=dc6zaTOxFJmzC&offset=" + offset;
	var arrAdded = [];
	var arrOne = 0;
console.log(queryURL);

	$.ajax({
	  url: queryURL,
	  method: "GET"
	}).done(function(response) {
		// console.log(response.data.length);
		// for (j=0; j<response.data.length; j++) {
		// 	var callBack = '{' + '"id: "' + response.data[j].id + '", "rating: "' +
		// 		response.data[j].rating + '", gif: "' + response.data[0].images.fixed_height.url + '"}';
		// 	if (j !== response.data.length -1) {
		// 				var terminator = ',';
		// 			} else {
		// 				var terminator = '';
		// 			}
		// 	var arrResultsItems = callBack + terminator;

		// 	// arrResults.push(callBack);
		// 	console.log(arrResultsItems);
		// }
		// while (arrOne < 25) {
		for (j=0; j<response.data.length; j++) {
		// $("#api-results").append('<div class="text">rating: ' + response.data[j].rating + '</div>');
		$("#api-results").prepend('<img class="image" src="' + response.data[j].images.fixed_height.url + '">');
		// $("#api-results").prepend('<div class="the-gif"><img src="' + response.data[j].images.fixed_height.url + '"></div>');
		// $("#api-results").prepend('<img src="' + response.data[j].images.fixed_height.url + '" alt="Rating: ' + response.data[j].rating + '">');
		
		// arrOne++;
		console.log(response.data[j].id);
		}
		if (lastButton === "" || (lastButton !== "" && lastButton === fetchItem)) {
			offset = offset + 25;
		} else if (lastButton !== "" && lastButton !== fetchItem) {
			offset = 0;
		}
		lastButton = fetchItem;
		console.log(offset);
		// nextClick(); //- prepend the next gif from the same button

	}); //end ajax
}

// function nextClick()  {
// 	console.log("second function");
// }

$(document).on("click", ".gif", fetch);

addGifButtons(); //- seed the page with a few buttons already in the gif array
// ---------------------------------------------------------