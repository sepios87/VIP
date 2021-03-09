$(function () {

    $('#buttonAddImage').on('click', function(e){
        let divPhoto = $(`
                <div>
                    <div>
                        <label for="image">Selectionner l'image</label>
                        <input name="image" type="file" accept="image/png, image/jpeg">
                    </div>
                    <div>
                        <label for="sujet">Sujet :</label>
                        <input name="sujet">
                    </div>
                </div>
        `)
        $(this).before(divPhoto)
        e.preventDefault();
    });

    $('input[type="file"]').on('change', function(event){
        console.log(URL.createObjectURL(event.target.files[0]))
    })

})