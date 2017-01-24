$(document).ready( () => {

let danger_html = "<div id='danger' class='alert alert-danger' role='alert'>Заполните обязательные поля! <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
let success_html = "<div id='success' class='alert alert-success' role='alert'>Ваш коментарий успешно добавлен! <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
let email_html = "<div id='email_warning' class='alert alert-warning' role='alert'>Поле Email заполнено некоректно! <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";


let form = document.forms["contact_form"];

let cards = [];

getCards();

function getCards() {
  $.ajax({url: "http://localhost/hunters/api/cards", success: function(result){
        cards = result;
        showCards();
    }});
}

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
  sendForm();
});

function sendForm() {
  $("#danger").remove();
  $("#success").remove();
  $("#email_warning").remove();



  if(!validateForm())
    $('#cotact_block').after(danger_html);
  else {
    if(!validateEmail(form['email'].value))
      $('#cotact_block').after(email_html);
    else {
       $('#cotact_block').after(success_html);
      sendComment();
     }
  }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateForm() {
  if(form['name'].value == "" ||
     form['email'].value == "" ||
     form['comment'].value == "") {
    return false;
  }
  else {
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
    getCards();
  });
}

});
