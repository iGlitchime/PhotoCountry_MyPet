<?php

/* echo "Hey! This is from PHP."  */

session_start();
$_SESSION['array'][0]['id']= 150;

echo count($_SESSION['array']); /* выводим количество переменных в массиве */

?>