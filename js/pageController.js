$(document).ready( () => {

let cards = [];
$.ajax({url: "http://localhost/hunters/api/cards", success: function(result){
      cards = result;
      showCards();
  }});

function showCards() {
  let cards_html = [];
  $.each(cards, (key, value) => {
    let card_html =
    "<div class='col-md-4 card'>" +
      "<header>" +
        "<h3>" + value.Name + "</h3>" +
      "</header>" +
      "<article>" +
        "<h4>" + value.Email + "</h4>" +
        "<p>" + value.Comment + "</p>" +
      "</article>" +
    "</div>";
    cards_html.push(card_html);
  });
  $('#cards_container').html(cards_html.join(""));
}

let danger_html = "<div id='danger' class='alert alert-danger' role='alert'>Заполните обязательные поля!</div>";

$('body').on('click', '#add', function() {
    $("#danger").remove();
    if(!validateForm())
      $('#cotact_block').after(danger_html);
});

function validateForm() {
  let form = document.forms["contact_form"];
  if(form['name'].value == "" ||
     form['email'].value == "" ||
     form['comment'].value == "") {
    return false;
  }
  else
    return true;
}

});
