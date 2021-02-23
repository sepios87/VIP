$(function () {

    const NB_IMAGE = 12;
    let page = parseInt($("#albumPhoto").data("indeximage")/NB_IMAGE);

    function changePage(newval) {
        page = newval;
        diplayImage();
      }

    function diplayImage(){
        $("#albumPhoto").children().each(function (index, elem){
            if (parseInt(index/NB_IMAGE) !== page) $(elem).hide();
            else $(elem).show();
        });
        if (page==0){
            $("#prevPageButton").hide();
            $("#debutPageButton").hide();
        } else {
            $("#prevPageButton").show();
            $("#debutPageButton").show();
        }
        if (page == parseInt($("#albumPhoto").children().length/NB_IMAGE)){
            $("#nextPageButton").hide();
            $("#finPageButton").hide();
        } else {
            $("#nextPageButton").show();
            $("#finPageButton").show();
        }
    }

    $("#nextPageButton").on('click', function(){
        if (page < parseInt($("#albumPhoto").children().length/NB_IMAGE)) changePage(page+1);
    });

    $("#prevPageButton").on('click', function(){
        if (page > 0) changePage(page-1);
    });

    $("#debutPageButton").on('click', function(){changePage(0)});

    $("#finPageButton").on('click', function(){changePage(parseInt($("#albumPhoto").children().length/NB_IMAGE))});

    diplayImage();
    $("#deplacementAlbum").css('display', 'block');

})