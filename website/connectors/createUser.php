<?php
$out = array();
$out['error'] = array();
if(isset($_POST['username'], $_POST['password'],$_POST['email'])){
	if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) || trim($_POST['username']) == '' || trim($_POST['password']) == ''  || (isset($_POST['address']) && trim($_POST['address']) == '') || (isset($_POST['country']) && trim($_POST['country']) == '')){
		$out['succes'] = false;
		$out['error'][] = 'General';
		echo json_encode($out);
		exit;
	}
	$_POST['address'] = isset($_POST['address']) ? $_POST['address'] : '';
	$_POST['country'] = isset($_POST['country']) ? $_POST['country'] : '';
	include('../config/config.php');
	global $pdo;
	$sth = $pdo->prepare("SELECT  temp1.nameCount, temp2.emailCount FROM (SELECT COUNT(*) as nameCount FROM Users WHERE name=:name) as temp1, (SELECT COUNT(*) as emailCount FROM Users WHERE email=:email) as temp2");
	$sth->bindparam(':name', $_POST['username']);
	$sth->bindparam(':email', $_POST['email']);
	$sth->execute();
	$fetch = $sth->fetch();
	$error = false;
	
	if($error['nameCount'] > 0){
		$out['error'][] = 'nameError';
		$error = true;
	}
	if($fetch['emailCount'] > 3){
		$error = true;
		$out['error'][] = 'emailError';
	}
	if($error){
		$out['succes'] = false;
		echo json_encode($out);
		exit;
	}

	$sth = $pdo->prepare("INSERT INTO Users ( `name`, `password`, email, `address`, country, `created`, `lastactiontime`) VALUES ( :username, :password, :email, :address, :country, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);");
	$sth->bindparam(':username', $_POST['username']);
	$sth->bindparam(':password',sha1( $_POST['password'] ) );
	$sth->bindparam(':email', $_POST['email']);
	$sth->bindparam(':address', $_POST['address']);
	$sth->bindparam(':country', $_POST['country']);
	try{
			$sth->execute();
			$out['succes'] = true;
			echo json_encode($out);
		exit;
	} catch(Exception $e){
		$out['succes'] = false;
		$out['error'][] = 'General';
		echo json_encode($out);
		exit;
	}
}
$out['succes'] = false;
$out['error'] = 'General';
echo json_encode($out);
exit;