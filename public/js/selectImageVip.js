$(function () {

    let idVip = $("#selectVip").val();
    $("#selectPhoto").children().each(function(index, elem){
        if ($(elem).data("vipid") != idVip) $(this).hide();
        else $(this).show();
    });

    $("#selectVip").change(function(){
        idVip = $(this).val();
        $("#selectPhoto").children().each(function(index, elem){
            if ($(elem).data("vipid") != idVip) $(this).hide();
            else {
                $('#selectPhoto').val($(this).val());
                $(this).show();
            }
        });
    })

})