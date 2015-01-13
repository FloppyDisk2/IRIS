<?php
$out = array();
$out['error'] = array();
if(isset($_POST['username'], $_POST['password'],$_POST['email'])){
	if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) || (trim($_POST['username']) == '' || strlen($_POST['username']) < 4)|| (trim($_POST['password']) == '' || strlen($_POST['password']) < 6) || (isset($_POST['address']) && trim($_POST['address']) == '') || (isset($_POST['country']) && trim($_POST['country']) == '')){
		$out['succes'] = false;
		$out['error'][] = 'general';
		echo json_encode($out);
		exit;
	}
	$_POST['address'] = isset($_POST['address']) ? $_POST['address'] : '';
	$_POST['country'] = isset($_POST['country']) ? $_POST['country'] : '';
	include('../config/config.php');
	global $pdo;
	$sth = $pdo->prepare
	("SELECT  temp1.nameCount, temp2.emailCount, temp3.activateCount FROM (SELECT COUNT(*) as nameCount FROM Users WHERE name=:name) as temp1, 
		(SELECT COUNT(*) as emailCount FROM Users WHERE email=:email) as temp2, 
		(SELECT COUNT(*) as activateCount FROM Users WHERE email=:email2 AND isActive=1) as temp3") 
	;
	$sth->bindparam(':name', $_POST['username']);
	$sth->bindparam(':email', $_POST['email']);
	$sth->bindparam(':email2', $_POST['email']);
	$sth->execute();
	$fetch = $sth->fetch();
	$error = false;
	if($fetch['nameCount'] > 0){

		$out['error'][] = 'nameError';
		$error = true;
	}
	if($fetch['emailCount'] > 2){
		$error = true;
		$out['error'][] = 'emailError';
	}
	if($error){
		$out['succes'] = false;
		echo json_encode($out);
		exit;
	}

	$code = rand(0,999999);
	$sth = $pdo->prepare("INSERT INTO Users ( `name`, `password`, email, `address`, country, `created`, `lastactiontime`, `activateCode`) VALUES ( :username, :password, :email, :address, :country, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, :activateCode);");
	$sth->bindparam(':username', $_POST['username']);
	$sth->bindparam(':password',sha1( $_POST['password'] ) );
	$sth->bindparam(':email', $_POST['email']);
	$sth->bindparam(':address', $_POST['address']);
	$sth->bindparam(':country', $_POST['country']);
	$sth->bindparam(':activateCode', $code);
	try{
			$sth->execute();
			$out['mailSend'] = false;

			if($fetch['activateCount'] == 0){
			$out['mailSend'] = true;
			$message = "Dear ".htmlentities($_POST['username'])." <br />
Your Password is: ".htmlentities($_POST['password'])."<br />
<br />
Thank you for registering at Iris The Game Before we can activate your account one last step must be taken to complete your registration.<br />
<br />
Please note - you must complete this last step to become a registered member. You will only need to visit this URL once to activate your account.<br />
<br />
To complete your registration, please visit this URL: <a href=\"http://localhost/theGame/website/veri.php?code=".$code."&user=".$pdo->lastInsertId()."\">http://localhost/theGame/website/veri.php?code=".$code."&user=".$pdo->lastInsertId()."</a><br />
**** Does The Above URL Not Work? ****<br />
If the above URL does not work, please try to copy the whole link in your browser's address bar.
<br />
If you are still having problems signing up please contact us at (info@test.nl) <br />
<br />
Kind regards,<br />
<br />
Team Floppydisk
";
			$headers = 
				'MIME-Version: 1.0' . "\r\n" .
			 	'Content-type: text/html; charset=iso-8859-1' . "\r\n".
				'From: info@localhost.local' . "\r\n" .
			    'Reply-To: info@localhost.local' ;

			mail($_POST['email'], "Iris The Game", $message, $headers);
		}
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