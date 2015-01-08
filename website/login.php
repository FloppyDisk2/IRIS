<?php
session_start();
if(isset($_GET['mode'])){
	if($_GET['mode'] == 'guest' && isset($_GET['code']) && $_GET['code'] == $_SESSION['guestKey']){
		echo '<h1>Logged in as a guest</h1>';
		exit;
	}
	if($_GET['mode'] == 'user' && isset($_SESSION['id'], $_SESSION['ip']) && $_SESSION['ip'] == $_SERVER['REMOTE_ADDR']){
		echo '<h1>Logged in as a user: #'.$_SESSION['id'].'</h1>';
		exit;
	}
}
echo '<h1>Error logging in</h1>';