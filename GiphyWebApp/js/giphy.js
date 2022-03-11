var PageOffset = 0;

$(window).on("load", function () {
    //console.log("window loaded");
    InfiniteScroll();
   // offset += 10;

    
});

//$(window).scroll(function () {
//    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
//        // alert("near bottom!");
//        console.log(PageOffset);
//        //InfiniteScroll(PageOffset);
//        alert('hi');
//        PageOffset = PageOffset + 10;
//    }
//});

$(document).ready(function () {
    $(window).on('scroll', function () {
        if ($(window).scrollTop() >= $(
            '.div').offset().top + $('.div').
                outerHeight() - window.innerHeight) {

            InfiniteScroll();
        }
    })
})


//$(window).on('scroll', function () {
//    if ($(window).scrollTop() > $(document).height() - $(window).height()) {
//        alert('hi');
//    }
//}).scroll();

function InfiniteScroll() {
   
    $("#ImageText").text("Trending Gifs");
    $.ajax({
        type: "GET",
        url: "https://api.giphy.com/v1/gifs/trending?api_key=izV5X2YE3sY71qcdptseUwhja3ZFdKzv&offset=" + PageOffset + "&limit=10",
        dataType: "json",
        success: function (Imagedata) {
            PageOffset = PageOffset + 10;
            for (var i = 0; i < Imagedata.data.length; i++) {
                //const limit = 10;
                //var offset = 0;
                // console.log(Imagedata);
                // console.log(Imagedata.data[i].images.original.url);
                //$('#GifImage').attr("src",Imagedata.data[0].images.original.url);
                $("#dImg").append("<img src=\"" + Imagedata.data[i].images.original.url + "\"/>")
                
            }
        }
    });
    //$("#dImg").empty();
};

function SearchInfiniteScroll() {
    var SearchValue = $("#SearchInput").val();
    $.ajax({
        type: "GET",
        url: "https://api.giphy.com/v1/gifs/search?api_key=izV5X2YE3sY71qcdptseUwhja3ZFdKzv&q=" + SearchValue + "&limit=10" + "&offset=" + PageOffset,
        dataType: "json",
        success: function (Imagedata) {
            PageOffset = PageOffset + 10;
            for (var i = 0; i < Imagedata.data.length; i++) {
                // console.log(Imagedata);
                // console.log(Imagedata.data[i].images.original.url);
                //$('#GifImage').attr("src",Imagedata.data[0].images.original.url);
                $("#dImg").append("<img src=\"" + Imagedata.data[i].images.original.url + "\"/>")
            }
        }
    });
    $("#dImg").empty();
};



function GiphyLoad() {
    var SearchValue = $("#SearchInput").val();
    if (SearchValue == "") {
        InfiniteScroll();
    }

    else {
        $("#ImageText").text("Search Result for" + " " + SearchValue);
        SearchInfiniteScroll();
    }
        
    //  console.log(SearchValue);
};
