<?php
class User{
	private static $_usertype = 'user';
	private static $_data = array();
	private static function generalCheck(){
		return isset($_SESSION['ip']) && $_SESSION['ip'] == $_SERVER['REMOTE_ADDR'];
	}

	private static function setUserType($type){
		if($type == 'guest' || $type == 'user'){
			User::$_usertype = $type;
		}
	}

	public static function init() {
		if(isset($_SESSION['userType'])){
			User::setUserType($_SESSION['userType']);
		}
	}
	public static function isLoggedIn() {
		return (User::$_usertype == 'user' && isset($_SESSION['id']) && User::generalCheck()) || (User::$_usertype == 'guest');
	}
	public static function requestGuest($code){
		if(isset($_SESSION['code']) && $_SESSION['code'] == $code && User::generalCheck()){
			User::serUserType('guest');
			return true;
		}
		return false;
	}
	public static function getId(){
		if( ! User::isLoggedIn() ){
			throw new Exception("User is not logged in!");
		}
		return $_SESSION['id'];
	}
	private static function getFromDatabase($key){
		if(in_array($key, User::$_data)){
			return User::$_data[$key];
		}

		global $pdo;
		$sth = $pdo->prepare('SELECT '.$key.' FROM Users WHERE id=:id');
		$sth->bindParam(':id', User::getId());
		try{
			$sth->execute();
			$fetch = $sth->fetch();
			return $fetch[$key];
		}catch(Exception $e){
			throw new Exception("Key is not found");
		}

	}
	public static function getName(){
		if(User::$_usertype == 'guest'){
			return 'Guest';
		} 
		return User::getFromDatabase('name');
	}

	public static function userExcist($id){
		global $pdo;
		$sth = $pdo->prepare('SELECT COUNT(*) as total FROM Users WHERE id=:id');
		$sth->bindParam(':id',$id);
		$sth->execute();
		$fet = $sth->fetch();
		return $fet['total'] > 0;
	}

}