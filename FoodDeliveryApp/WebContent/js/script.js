$(document).ready(function () {
	$(".buttonGroup").click(function () {
		$(".buttonGroup").removeClass("active");
		$(this).addClass("active");
	});

	var visibleSearch = false;
	var visibleFilter = false;
	var visibleSort = false;

	$("#searchButton").click(function () {
		visibleSearch = showOrHideFilters(visibleSearch, $(".searchInput"));
	});

	$("#filterButton").click(function () {
		visibleFilter = showOrHideFilters(visibleFilter, $(".filterInput"));
	});

	$("#sortButton").click(function () {
		visibleSort = showOrHideFilters(visibleSort, $(".sortInput"));
	});
});

function showOrHideFilters(visible, container) {
	if (visible === false) {
		container.show("slow");
		visible = true;
	} else {
		container.hide("slow");
		visible = false;
	}

	return visible;
}
