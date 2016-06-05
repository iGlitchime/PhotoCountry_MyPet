<?php

/* echo "Hey! This is from PHP."  */

// include "array.php"; /* даем видимость другого php файла */
// global $actions;

session_start();

$_SESSION['array'] = array(
    0 => array(
        'id' => 145,
        'title' => 'Test 1',
        'rest_time' => 0,
        'recovery_time' => 600,
        'points' => 10),
    1 => array(
        'id' => 146,
        'title' => 'Test 2',
        'rest_time' => 428,
        'recovery_time' => 660,
        'points' => 20),
    2 => array(
        'id' => 147,
        'title' => 'Test 3',
        'rest_time' => 0,
        'recovery_time' => 480,
        'points' => 30)
    );

$_SESSION['current_score'] = 123;

echo json_encode(array('current_score' => $_SESSION['current_score'], 'ActionsInfo' => $_SESSION['array']));


?>