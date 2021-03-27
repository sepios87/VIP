$(function () {

    let idVip = $("#selectVip").val();

    $("#selectVip").children().each(function(index, elem1){
        $(elem1).hide();
        $("#selectPhoto").children().each(function(index, elem){
            if ($(elem1).val() == $(elem).data("vipid")){
                $(elem1).show();
                $("#selectVip").val($(elem1).val());
                $("#selectPhoto").val($(elem).val());
            } 
        })
    });
    
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