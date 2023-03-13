<?php 
//Initializing the session
session_start();

//Unset all of the session variables
$_SESSION = array();

//Destroy the sessions: 
session_destroy();

//redirect to login
header("locatioon: login.php");

exit;
?>