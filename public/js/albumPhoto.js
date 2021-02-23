$(function () {

    //album toutes les stars
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

        if (page==0) $("#prevPageButton, #debutPageButton").hide();
        else $("#prevPageButton, #debutPageButton").show();

        if (page == parseInt($("#albumPhoto").children().length/NB_IMAGE)) $("#nextPageButton, #finPageButton").hide();
        else $("#nextPageButton, #finPageButton").show();
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

    //afficher juste la star

    let numeroPhoto = 0;

    function changePageStar(newNum){
        numeroPhoto = newNum;
        $('.photoStar').each(function(){
            $(this).hide();
        });
        $(`.photoStar:eq(${newNum})`).show();
    }

    $('#photoStarSuivante').on('click', function(){
        if (numeroPhoto == ($('.photoStar').length)-1) changePageStar(0);
        else changePageStar(numeroPhoto+1);
    });

    $('#photoStarPrecedente').on('click', function(){
        if (numeroPhoto == 0) changePageStar(($('.photoStar').length)-1)
        else changePageStar(numeroPhoto-1);
    });

    changePageStar(numeroPhoto);

})