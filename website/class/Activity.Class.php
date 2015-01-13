<?php
session_start();
include('../config/config.php');
include('User.Class.php');
abstract class controllerHelper{
	public static function create(){}
}
interface controller{
	public function load($data, $userId);
}
class registerController extends controllerHelper implements controller{
	

	public function load($data, $userId){
		return $data['username'] .' is registered as a new member';
	}
	public static function create($userName){
		return array('username' => $userName);
	}
}
class pointsController extends controllerHelper implements controller{
	

	public function load($data, $userId){
		return $data['username'] .' has gotten '.$data['points'].' points';
	}
	public static function   create($userName, $points){
		return array('username' => $userName, 'points' => $points);
	}
}
class personalRecordController extends controllerHelper implements controller{
	

	public function load($data, $userId){
		return $data['username'] .' has beaten her own personal record';
	}
	public static function   create($userName){
		return array('username' => $userName);
	}
}
class rankingController extends controllerHelper implements controller{
	

	public function load($data, $userId){
		return $data['username'] .' entred the the top 10 '.$data['sheet'];
	}
	public static function  create($userName, $sheet){
		return array('username' => $userName, 'sheet'=>$sheet);
	}
}
class Activity{
	private static $controllers = array();
	public function constructor(){
		self::checkArray();
	}
	private static function checkArray(){
		if(count(self::$controllers) == 0){
			self::$controllers = array(new registerController(), new pointsController(), new personalRecordController(), new rankingController());

		}
	}
	public static function add($data, $controllerId){
		self::checkArray();
		global $pdo;
		$sth = $pdo->prepare("INSERT INTO Activity (userId, data, controller) VALUES (:id, :data, :controller);");
		$sth->bindParam(':id', User::getId());
		$sth->bindParam(':data', json_encode($data));
		$sth->bindParam(':controller', $controllerId);
		return $sth->execute();
	}

	private static function talkController($controllerId, $data, $userId){
		$temp =  self::$controllers[$controllerId];
		return $temp->load($data, $userId);
	}
	public static function getAllActivity($limit){
		self::checkArray();
		if(!is_numeric($limit)){
			throw new Exception("Is not numeric!");
		}
		global $pdo;
		$sth = $pdo->prepare("SELECT * FROM Activity LIMIT 0, ".$limit);
		$sth->execute();
		$out = array();
		foreach ($sth as $value) {
			$out[] = array('string' => self::talkController($value['controller'], json_decode($value['data'], true), $value['userId']), 'date' => $value['date'] );
		}
		return $out;
	}
}
Activity::add(pointsController::create('Kevin', 100), 1);
print_r(Activity::getAllActivity(10));