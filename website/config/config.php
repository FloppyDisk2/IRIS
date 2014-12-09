<?php
error_reporting(E_ALL);
setlocale(LC_MONETARY, 'nl_NL');
$pdo = new PDO("mysql:host=localhost;dbname=webwinkel", "root", "");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);