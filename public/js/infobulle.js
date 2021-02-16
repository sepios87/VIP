function pop(elem, image, texte) {
  let div = $(
    `<div id="zoom">
      <div>
        <p><b>${$(elem).text()}</b></p>
        <p>${texte} </p>
      </div>
    </div>`);
  let img = $('<img height="120px">');
  img.attr("src", `/images/vip/${image}`);
  img.prependTo(div);
  div.appendTo("body");
  $(elem).on("mousemove", function (e) {
    $("#zoom").offset({
      left: e.pageX,
      top: e.pageY + 20,
    });
  });
}

function depop() {
  $("#zoom").remove();
}