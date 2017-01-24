<?php

$connect = mysql_connect("localhost","root","") or die(mysql_error());

mysql_query("DROP DATABASE hon_hunt", $connect);

$sql = "CREATE DATABASE hon_hunt";
if (mysql_query($sql, $connect)) {
    echo "Database hon_hunt created successfully\n";
} else {
    echo 'Error creating database: ' . mysql_error() . "\n";
}

mysql_select_db("hon_hunt", $connect) or die(mysql_error());
mysql_query('SET NAMES utf8');

//initializing db script
$sql = "

CREATE TABLE `cards` (
  `Id` int(11) NOT NULL,
  `Name` varchar(256) NOT NULL,
  `Email` varchar(256) NOT NULL,
  `Comment` text NOT NULL,
  `Date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
";
mysql_query($sql) or die(mysql_error());
$sql = "INSERT INTO `cards` (`Id`, `Name`, `Email`, `Comment`, `Date`) VALUES
(1, 'Вася', 'vasya@mail.com', 'Мой комментарий супер крут оченьда', '2017-01-23 19:47:01'),
(2, 'vasya', 'email@mail.com', 'cpfas lnasd fjasld fjlasdf', '2017-01-23 20:02:05');";
 mysql_query($sql) or die(mysql_error());
 $sql = "ALTER TABLE `cards` ADD PRIMARY KEY (`Id`)";
 mysql_query($sql) or die(mysql_error());
 $sql = "ALTER TABLE `cards` MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;";
 mysql_query($sql) or die(mysql_error());
 //
 // ALTER TABLE `cards` ADD PRIMARY KEY ('Id');
 //
 // ALTER TABLE `cards` MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
 //
 // INSERT INTO `cards` (`Id`, `Name`, `Email`, `Comment`, `Date`) VALUES
 // (1, `Вася`, `vasya@mail.com`, `Мой комментарий супер крут оченьда`, `2017-01-23 19:47:01`);


 ?>
