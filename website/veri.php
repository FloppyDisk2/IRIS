<?php
session_start();
if(!isset($_GET['user'], $_GET['code'])){
	echo '<h1>Error logging in</h1>';
}
include('config/config.php');
global $pdo;
$sth = $pdo->prepare("SELECT COUNT(*) as total, isActive, email FROM Users WHERE activateCode=:code AND id=:userId");
$sth->bindparam(':code', $_GET['code']);
$sth->bindparam(':userId', $_GET['user']);
$sth->execute();
$fetch = $sth->fetch();
if($fetch['isActive'] || $fetch['total'] == 0){
	echo 'This account is already active';
	exit;
}
echo 'You have succesfully activate your account <br />';

$sth = $pdo->prepare("UPDATE  Users SET  isActive =  1 WHERE  email = :email AND isActive = 0;");
$sth->bindparam(':email', $fetch['email']);
$sth->execute();
$count = $sth->rowCount();
if($count > 1){
	echo $count .' accounts are active now';
}