$(document).ready( () => {

let danger_html = "<div id='danger' class='alert alert-danger' role='alert'>Заполните обязательные поля! <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
let success_html = "<div id='success' class='alert alert-success' role='alert'>Ваш коментарий успешно добавлен! <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";

let form = document.forms["contact_form"];

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

$('body').on('click', '#add', function() {
    $("#danger").remove();
    $("#success").remove();
    if(!validateForm())
      $('#cotact_block').after(danger_html);
    else {
      $('#cotact_block').after(success_html);
    }
});

function validateForm() {

  if(form['name'].value == "" ||
     form['email'].value == "" ||
     form['comment'].value == "") {
    return false;
  }
  else {
    sendComment();
    return true;
  }
}

function sendComment() {


  let object = {};
  object.name = form['name'].value;
  object.email = form['email'].value;
  object.comment = form['comment'].value;
  //console.log(object);
  $.post("http://localhost/hunters/api/cards/",
  JSON.stringify(object),
  function(data, status){
      alert("Data: " + data + "\nStatus: " + status);
  });
}

});
