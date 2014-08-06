function loadBrowsePage(){
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
}

$(document).ready(function() {
	loadBrowsePage();

	$("#browseWine").on("click",function() {
		if($("#viewDetails").hasClass("hidden") === true)
			return;

		loadBrowsePage();
	});

	$("#addWine").on("click",function() {
		$("#_id").val("");
		$("#name").val("");
		$("#grapes").val("");
		$("#country").val("");
		$("#region").val("");
		$("#year").val("");
		$("#description").text.empty();
		$("#picture").attr("src","http://dev.naustud.io:3000/pics/generic.jpg");
		$("#wineList").find("ul").empty();
		$("#viewDetails").removeClass("hidden");
		$("#viewDetails").addClass("active");
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

	$(".deleteBttn").on("click",function() {
		var serviceURL = "http://dev.naustud.io:3000/wines/" + $("#_id").val();
		$.ajax({
			type: "delete",
			url: serviceURL,
			success: function(){
				alert("wine deleted successfully");
				loadBrowsePage();
			}
		})
	});

	$(".saveBttn").on("click",function() {
		var serviceURL = "http://dev.naustud.io:3000/wines";
		var serviceType = "post";
		if($("#_id").val() !== ""){
			serviceURL += "/";
			serviceURL += $("#_id").val();
			serviceType = "put";
		}
		var dataOb = {
			name: $("#name").val(),
			grapes:	$("#grapes").val(),
			country: $("#country").val(),
			region: $("#region").val(),
			year: $("#year").val(),
			description: $("#description").text(),
		};
		$.ajax({
			type: serviceType,
			data: dataOb,
			dataType: 'json',
			url: serviceURL,
			success: function(response){
				console.log(response);
				$("#viewDetails").append("<div class='successText'><strong>Success!</strong> wine updated successfully</div>");
				$(".successText").css({
					'color':'#468847',
					'background-color':'#dff0d8',
				});
				$(".successText").fadeOut(5000);
			}
		})
		event.preventDefault();
	});


});