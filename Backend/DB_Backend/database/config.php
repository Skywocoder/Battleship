<?php
$_db_host = "localhost";
$_db_datenbank = "schiffeversenken";
$_db_username = "schiffeversenken"; 
$_db_passwort = "patrick";
 
/* Attempt to connect to MySQL database */
$link = new mysqli($_db_host, $_db_username, $_db_passwort, $_db_datenbank);
 
// Check connection
if($link === false){
    die("<br>ERROR: Could not connect. " . connect_error());
}
?>