<?php
class Highscore{
	public static function getAllTimeScores($limit){
		global $pdo;
		if(!is_numeric($limit)){
			throw new Exception("Limit is not numeric");
		}
		$sth = $pdo->prepare('SELECT Highscores.score, Highscores.date, Users.name FROM Highscores INNER JOIN Users ON Highscores.userId = Users.id ORDER BY Highscores.score DESC, Highscores.date ASC LIMIT 0,'.$limit);

		$out = array();
		$sth->execute();
		return ($sth->fetchAll());
	}
	private static function getBetween($limit, $prevDays){
		global $pdo;
		if(!is_numeric($limit) || !is_numeric($prevDays)){
			throw new Exception("Values are not numeric");
		}
		$sth = $pdo->prepare('SELECT Highscores.score, Highscores.date, Users.name FROM Highscores INNER JOIN Users ON Highscores.userId = Users.id WHERE  Highscores.date BETWEEN DATE_SUB(NOW(), INTERVAL '.$prevDays.' DAY) AND NOW() ORDER BY Highscores.score DESC, Highscores.date ASC LIMIT 0,'.$limit);

		$out = array();
		$sth->execute();
		return ($sth->fetchAll());	
	}
	public static function getTodayScores($limit){	
		return self::getBetween($limit, 1);
	}
	public static function getLastWeekScores($limit){	
		return self::getBetween($limit, 7);
	}
}
class OwnHighscore extends Highscore{
		public static function getAllTimeScores($limit){
		global $pdo;
		if(!is_numeric($limit)){
			throw new Exception("Limit is not numeric");
		}
		$sth = $pdo->prepare('SELECT  COUNT(Highscores.score) as total, Highscores.score, Highscores.date FROM Highscores WHERE Highscores.userId =:id GROUP BY Highscores.score ORDER BY Highscores.score DESC, Highscores.date DESC LIMIT 0,'.$limit);
		$sth->bindParam(':id', User::getId());
		$sth->execute();
		return ($sth->fetchAll());
	}
	private static function getBetween($limit, $prevDays){
		global $pdo;
		if(!is_numeric($limit) || !is_numeric($prevDays)){
			throw new Exception("Values are not numeric");
		}
		$sth = $pdo->prepare('SELECT  COUNT(Highscores.score) as total, Highscores.score, Highscores.date FROM Highscores WHERE Highscores.userId =:id AND  Highscores.date BETWEEN DATE_SUB(NOW(), INTERVAL '.$prevDays.' DAY) AND NOW()  ORDER BY Highscores.score DESC, Highscores.date DESC LIMIT 0,'.$limit);
		$sth->bindParam(':id', User::getId());
		$sth->execute();
		return ($sth->fetchAll());	
	}
}