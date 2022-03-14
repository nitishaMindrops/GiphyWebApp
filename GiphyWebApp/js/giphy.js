var PageOffset = 0;
var responseArray = [];

$(window).on("load", function () {
    //console.log("window loaded");
    TrendingScroll();
});



$(document).ready(function () {
    $(window).on('scroll', function () {
        if ($(window).scrollTop() >= $(
            '.div').offset().top + $('.div').
                outerHeight() - window.innerHeight) {
            //$("#dImg").append(SearchInfiniteScroll());
           // responseArray.push(offsetValue);
            //SearchInfiniteScroll();

            if ($("#SearchInput").val() == "") {
                TrendingScroll();
            }
            else {
                InputSearchScroll();
            }
        }
    })
})


function TrendingScroll() {

    $("#ImageText").text("Trending Gifs");
    $.ajax({
        type: "GET",
        url: "https://api.giphy.com/v1/gifs/trending?api_key=izV5X2YE3sY71qcdptseUwhja3ZFdKzv&offset=" + PageOffset + "&limit=10",
        dataType: "json",
        success: function (Imagedata) {
            PageOffset = PageOffset + 10;
            var offsetValue = Imagedata.pagination.offset;
            if (!responseArray.includes(offsetValue)) {
                for (var i = 0; i < Imagedata.data.length; i++) {
                    $("#dImg").append("<img src=\"" + Imagedata.data[i].images.original.url + "\"/>")
                    responseArray.push(offsetValue);
                }
            }
           // console.log(Imagedata);

        }
    });
    //$("#dImg").empty();
};


function InputSearchScroll() {
    var SearchValue = $("#SearchInput").val();
    $.ajax({
        type: "GET",
        url: "https://api.giphy.com/v1/gifs/search?api_key=izV5X2YE3sY71qcdptseUwhja3ZFdKzv&q=" + SearchValue + "&limit=10" + "&offset=" + PageOffset,
        dataType: "json",
        success: function (Imagedata) {
            PageOffset = PageOffset + 10;
            var offsetValue = Imagedata.pagination.offset;
            if (!responseArray.includes(offsetValue)) {
                for (var i = 0; i < Imagedata.data.length; i++)
                {
                    // console.log(Imagedata);
                    // console.log(Imagedata.data[i].images.original.url);
                    $("#dImg").append("<img src=\"" + Imagedata.data[i].images.original.url + "\"/>")
                    
                }
                responseArray.push(offsetValue);
            }
        }
    });
    
    //responseArray = [];
};



function GiphyLoad() {
    responseArray = [];
    $("#dImg").empty();
    var SearchValue = $("#SearchInput").val();
    if (SearchValue == "") {
        TrendingScroll();
    }

    else {
        $("#ImageText").text("Search Result for" + " " + SearchValue);
        InputSearchScroll();
    }       
    //  console.log(SearchValue);
};
