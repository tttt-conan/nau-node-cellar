$(document).ready(function() {
	$.ajax({
		dataType: "json",
		url: "http://dev.naustud.io:3000/wines",
		success: function(wineList){
			function renderList(wine){
				var temp = "generic.jpg";
				if(wine.hasOwnProperty("picture") === true && wine.picture !== null)
					temp = wine.picture;
				return '<li><a data-id="'+ wine._id +'"><img src="http://dev.naustud.io:3000/pics/'+ temp
				+'" alt="'+wine.name+'"><h5>'+wine.name+'</h5>'+wine.year+' '+wine.grapes
				+'<br>'+wine.region+', '+wine.country+'</a></li>';
			}
			for(var i = 0; i < wineList.length; i++){
				var layout = renderList(wineList[i]);
				$("#wineList ul").append(layout);
			}
		}
	});


	$("#browseWine").on("click",function() {
		$("#viewDetails").addClass("hidden");
		$("#viewDetails").removeClass("active");
		$.ajax({
			dataType: "json",
			url: "http://dev.naustud.io:3000/wines",
			success: function(wineList){
				function renderList(wine){
					var temp = "generic.jpg";
					if(wine.hasOwnProperty("picture") === true && wine.picture !== null)
						temp = wine.picture;
					return '<li><a data-id="'+ wine._id +'"><img src="http://dev.naustud.io:3000/pics/'+ temp
					+'" alt="'+wine.name+'"><h5>'+wine.name+'</h5>'+wine.year+' '+wine.grapes
					+'<br>'+wine.region+', '+wine.country+'</a></li>';
				}
				for(var i = 0; i < wineList.length; i++){
					var layout = renderList(wineList[i]);
					$("#wineList ul").append(layout);
				}
			}
		});
	});


	$("#wineList ul").on("click","a",function() {
		$("#wineList").find("ul").empty();
		$("#viewDetails").removeClass("hidden");
		$("#viewDetails").addClass("active");
		var serviceURL = "http://dev.naustud.io:3000/wines/" + $(this).data("id");
		$.ajax({
			dataType: "json",
			url: serviceURL,
			success: function(wine){
				$("#_id").val(wine._id);
				$("#name").val(wine.name);
				$("#grapes").val(wine.grapes);
				$("#country").val(wine.country);
				$("#region").val(wine.region);
				$("#year").val(wine.year);
				$("#description").text(wine.description);
				$("#picture").attr("src","http://dev.naustud.io:3000/pics/"+(wine.picture||"generic.jpg"));
			}
		});
	});

});