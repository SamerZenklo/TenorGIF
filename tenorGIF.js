$(document).ready(function () {
    $(document).on('mouseenter', '.image', function (e) {
        $(e.target).animate({
            width: '400px',
            height: '200px',
        })
    })
    $(document).on('mouseout', '.image', function (e) {
        $(e.target).animate({
            width: '300px',
            height: '150px',
        })
    })
    $('#button').on('click', function () {
        $('#gifs').empty();
        var search = $('#search').val();
        var count = $('#count').val();
        if (search != '' && count != 0) {
            if (count > 50) {
                count = 50;
            }
            getImages(search, count)
        } else {
            $('#gifs').append('<h4>You should fill all fields</h4>');
        }
    })


    function getImages(name, number) {
        var request = new XMLHttpRequest();
        request.open('GET', "https://api.tenor.com/v1/search?q=" + name + "&key=SC9P03UA1R0X&limit=" + number, true);
        request.onload = function () {
            if (this.status == 200) {
                console.log(request.responseText)
                var data = JSON.parse(request.responseText);
                var gifs = data["results"];
                $('#load').empty();
                if (gifs.length > 0) {
                    gifs.forEach(element => {
                        var img = $('<img class="image">');
                        img.attr('src', element["media"][0]["mediumgif"]["url"]);
                        $('#gifs').append(img);
                    });
                } else {
                    $('#gifs').append('<h3>Please try another thing</h3>');
                }
            }
        }
        request.send(null);
    }
})



