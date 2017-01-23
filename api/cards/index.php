<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$connect = mysql_connect("localhost","root","") or die(mysql_error());
mysql_select_db("hon_hunt", $connect) or die(mysql_error());
mysql_query('SET NAMES utf8');


// start get
if($_SERVER['REQUEST_METHOD'] == 'GET') {
  $result = mysql_query("SELECT * FROM Cards") or die(mysql_error());
  $data = mysql_fetch_assoc($result);
  $outp = "";

  $emparray = array();
      do
     {
         $emparray[] = $data;
     } while($data =mysql_fetch_assoc($result));
  mysql_close();
  echo json_encode($emparray);
}
// end get

// start post
if($_SERVER['REQUEST_METHOD'] == 'POST') {

  $inputJSON = file_get_contents('php://input');
  $input = json_decode($inputJSON, TRUE); //convert JSON into array\
  echo json_encode($input);

  $name = $input['name'];
  $email = $input['email'];
  $comment = $input['comment'];

  mysql_query("INSERT INTO Cards
            (Name, Email, Comment)
    VALUES  ('$name', '$email', '$comment')  ") or die(mysql_error());

}
// end post

?>
