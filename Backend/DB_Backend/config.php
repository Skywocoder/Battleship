<?php 
    $_db_host = "localhost";
    $_db_datenbank = "battleship";
    $_db_username = "battleship";
    $_db_passwort = "";

    /* Attempting to coneect to the MySQL database */
    $link = new mysqli($_db_host, $_db_username, $_db_passwort ,$_db_datenbank);

    /** Checking the connection  */
    if($link === false){
        die("<br> Error: Connection failed! " . connect_error());
    }

    
?>