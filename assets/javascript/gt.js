var gifs = ["basketball", "baseball"];
page = 0; //- paging option

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
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + fetchItem.replace(" ", "+") + "&api_key=dc6zaTOxFJmzC";
	var arrResults = [];
	// console.log(queryURL);

	$.ajax({
	  url: queryURL,
	  method: "GET"
	}).done(function(response) {

	  // console.log(response.images.source)
	  // console.log(response.Runtime);
	  // console.log("source: " + response.data[0].source);

	  // console.log(response);
	  // console.log("rating: " + response.data[0].rating);
	  // console.log(JSON.stringify(response.data[0].images.looping));
	  // console.log('<img src="' + response.data[0].images.fixed_height.url + '">');
	  // console.log("total results: " + response.pagination.total_count);
	  console.log("prior to showing");
	  $("#api-results").prepend('<div class="text">rating: ' + response.data[0].rating + '</div>');
	  $("#api-results").prepend('<div class="the-gif"><img src="' + response.data[0].images.fixed_height.url + '"></div>');
	  console.log("after showing");
	});
}

$(document).on("click", ".gif", fetch);

addGifButtons(); //- seed the pages with a few buttons already in the gif array
// ---------------------------------------------------------