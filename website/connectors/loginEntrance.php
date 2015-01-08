<?php
session_start();
if(isset($_POST['gb'], $_POST['ww'])){
	include('../config/config.php');
	global $pdo;
	$sth = $pdo->prepare('SELECT COUNT(*) as total, id FROM Users WHERE name=:name AND password=:pass');
	$sth->bindparam(':name',$_POST['gb']);
	$sth->bindparam(':pass',sha1($_POST['ww']));
	$sth->execute();
	$fet = $sth->fetch();
//	print_r($fet);
	if($fet['total'] > 0) {
		$_SESSION['id'] = $fet['id'];
		$_SESSION['ip'] = $_SERVER['REMOTE_ADDR'];
		echo 'Ok';
	} else {
		echo 'Error';
	}
	return;
}
echo 'Error';