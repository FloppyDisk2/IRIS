<?php
session_start();
header('Content-Type: text/html; charset=utf-8');
if(isset($_POST['id'], $_POST['score'])){
	include('../config/config.php');
	include('../class/User.Class.php');

	global $pdo;
	global $User;

	if(!User::userExcist($_POST['id'])){
		echo 'Error';
		exit;
	}
	$sth = $pdo->prepare('INSERT INTO Highscores (userId, score) VALUES (:id, :score)');
	$sth->bindparam(':id',$_POST['id']);
	$sth->bindparam(':score',$_POST['score']);
	try{
		$sth->execute();
		echo 'Ok';
		exit;
	}catch(Exception $e){}
}
echo 'Error';