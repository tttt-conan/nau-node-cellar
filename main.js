$(document).ready(function() {
	if($("#wineList").hasClass("active")){
		$.ajax({
			dataType: "json",
			url: "http://dev.naustud.io:3000/wines",
			success: function(wineList){
				function renderList(wine){
					var temp = "generic.jpg";
					if(wine.hasOwnProperty("picture") === true)
						temp = wine.picture;
					return '<li><a href="/'+ wine._id +'"><img src="http://dev.naustud.io:3000/pics/'+ temp
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
});