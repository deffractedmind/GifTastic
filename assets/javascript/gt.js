$(function() { //-shorthand document.ready
	var gifs = ["basketball", "baseball"]; //- seed gifs
	var toggle = 0;
	var offset = 0; //- paging option
	var lastButton = "";

	$("#add-gif").on("click", function (event){
		event.preventDefault(); //- this is necessary or array.push will not work 
		var gif = $("#gif-add").val().trim();

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
			addButton.addClass("gif btn btn-sm btn-default-outline");
			addButton.attr("data-name", gifs[i]);
			addButton.text(gifs[i]);

	        }
		}

	function fetch() {
		$("#api-results").empty();
		var fetchItem = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + fetchItem.replace(" ", "+") + "&api_key=dc6zaTOxFJmzC&limit=10&offset=" + offset;
		var arrAdded = [];
		var arrOne = 0;

		$.ajax({
		  url: queryURL,
		  method: "GET"
		}).done(function(response) {

			for (j=0; j<response.data.length; j++) {

				// $("#api-results").prepend('<img class="image" srcset="' + response.data[j].images.fixed_height_still.url + '" src="'+response.data[j].images.fixed_height.url + '">');
				var rating = response.data[j].rating.toUpperCase();
				var freeze = response.data[j].images.fixed_height_still.url;
				var move = response.data[j].images.fixed_height.url;

				$("#api-results").prepend('<div class="parent"><div class="rate">Rated: '+ rating + '<div class="img-class"><img class="image" title="Rated: ' + rating + '" srcset="' + freeze + '" src="'+ move + '"></div></div></div>');
				// $("#api-results").append('<div class="rate"></div>');

			}

			//- evaluate if 'this' was the same as previous, if so serve the next 25, if not start on the first batch (page)
			if (lastButton === "" || (lastButton !== "" && lastButton === fetchItem)) {
				offset = offset + 10;
			} else if (lastButton !== "" && lastButton !== fetchItem) {
				offset = 0;
			}
			lastButton = fetchItem;

			//- begin toggle between still and animated switch
			$(".image").on("click", function(){
				var that = $(this);
				var imgFreeze = that.attr("srcset");
				var imgMove = that.attr("src");
				var imgCurrent = imgFreeze;

				if (imgCurrent !== imgMove) {
					that.attr("srcset", imgMove);
					that.attr("src", imgFreeze);
					imgCurrent = imgMove;
				}
				else {
					that.attr("srcset", imgFreeze);
					that.attr("src", imgMove);
					imgCurrent = imgFreeze;
				}

			})

		}); //end ajax
	}

	$(document).on("click", ".gif", fetch);

	addGifButtons(); //- seed the page with a few buttons already in the gif array
	// ---------------------------------------------------------

});
