
$(window).on("load", function () {
    //console.log("window loaded");
    $("#ImageText").text("Trending Gifs");
    $.ajax({
        type: "GET",
        url: "https://api.giphy.com/v1/gifs/trending?api_key=izV5X2YE3sY71qcdptseUwhja3ZFdKzv&offset=",
        dataType: "json",
        success: function (Imagedata) {
            for (var i = 0; i < Imagedata.data.length; i++) {
                // console.log(Imagedata);
                // console.log(Imagedata.data[i].images.original.url);
                //$('#GifImage').attr("src",Imagedata.data[0].images.original.url);
                $("#dImg").append("<img src=\"" + Imagedata.data[i].images.original.url + "\"/>")
            }
        }
    });
    $("#dImg").empty();
});

//$('#demo').pagination({
//    dataSource: [1, 2, 3, 4, 5, 6, 7,8,9,10],
//    callback: function (data, pagination) {
//        // template method of yourself
//        var html = template(data);
//        dataContainer.html(html);
//    }
//})


function GiphyLoad() {
    var SearchValue = $("#SearchInput").val();
    if (SearchValue == "") {
        $("#ImageText").text("Trending Gifs");
        $.ajax({
            type: "GET",
            url: "https://api.giphy.com/v1/gifs/trending?api_key=izV5X2YE3sY71qcdptseUwhja3ZFdKzv&offset=",
            dataType: "json",
            success: function (Imagedata) {
                for (var i = 0; i < Imagedata.data.length; i++) {
                    // console.log(Imagedata);
                    // console.log(Imagedata.data[i].images.original.url);
                    //$('#GifImage').attr("src",Imagedata.data[0].images.original.url);
                    $("#dImg").append("<img src=\"" + Imagedata.data[i].images.original.url + "\"/>")
                }
            }
        });
        $("#dImg").empty();

    }
        
    else {
        $("#ImageText").text("Search Result for" + " " + SearchValue);
        $.ajax({
            type: "GET",
            url: "https://api.giphy.com/v1/gifs/search?api_key=izV5X2YE3sY71qcdptseUwhja3ZFdKzv&q=" + SearchValue,
            dataType: "json",
            success: function (Imagedata) {
                for (var i = 0; i < Imagedata.data.length; i++) {
                    // console.log(Imagedata);
                    // console.log(Imagedata.data[i].images.original.url);
                    //$('#GifImage').attr("src",Imagedata.data[0].images.original.url);
                    $("#dImg").append("<img src=\"" + Imagedata.data[i].images.original.url + "\"/>")
                }
            }
        });
        $("#dImg").empty();
    }
    //  console.log(SearchValue);
};
$(function () {
    $('.pagination-page').pagination({
        items: 100,
        itemsOnPage: 10,
        cssStyle: 'light-theme'
    });
});

jQuery(function ($) {

    var items = $("#dImg");

    var numItems = items.length;
    var perPage = 10;

    // Only show the first 2 (or first `per_page`) items initially.
    items.slice(perPage).hide();
    $(".pagination-page").pagination({
        items: numItems,
        itemsOnPage: perPage,
        cssStyle: "light-theme",

        // This is the actual page changing functionality.
        onPageClick: function (pageNumber) {
            // We need to show and hide `tr`s appropriately.
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;

            // We'll first hide everything...
            items.hide()
                // ... and then only show the appropriate rows.
                .slice(showFrom, showTo).show();
        }
    });
});

function checkFragment() {
    // If there's no hash, treat it like page 1.
    var hash = window.location.hash || "#page-1";

    // We'll use a regular expression to check the hash string.
    hash = hash.match(/^#page-(\d+)$/);

    if (hash) {
        // The `selectPage` function is described in the documentation.
        // We've captured the page number in a regex group: `(\d+)`.
        $(".pagination-page").pagination("selectPage", parseInt(hash[1]));
    }
};

// We'll call this function whenever back/forward is pressed...
$(window).bind("popstate", checkFragment);

// ... and we'll also call it when the page has loaded
// (which is right now).
checkFragment();