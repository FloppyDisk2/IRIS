<?php
session_start();
include('class/User.Class.php');
include('class/Highscore.Class.php');
include('config/config.php');

User::init();
if(isset($_GET['mode'], $_GET['code']) && $_GET['mode'] == 'guest'){
	if(!User::requestGuest($_GET['code'])){
		echo '<h1>Error logging in</h1>';
		exit;
	}
}
if(User::isLoggedIn()){
	echo 'Het is gelukt!';
} else {
	echo 'je bent niet ingelogt';
	exit;
}
echo User::getName();
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>jQuery UI Sortable - Portlets</title>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
  <script src="//code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
  <link rel="stylesheet" href="/resources/demos/style.css">
  <style>
  #content {
    width: 850px;
    height: 1000px;
    background-color: #ffedd6;
    margin: 0 auto;
  }
  .column {
    width: 800px;
    margin: 0 auto;
    padding-bottom: 100px;
  }
  .portlet {
    margin: 0 1em 1em 0;
    padding: 0.3em;
    background: none !important;
    border-radius: 0;
  }
  .portlet-header {
    padding: 0.2em 0.3em;
    margin-bottom: 0.5em;
    position: relative;
    border-radius: 0;
    background:none;
    border:0;
  }
  .portlet-toggle {
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -8px;
  }
  .portlet-content {
    padding: 0.4em;
  }
  .portlet-placeholder {
    border: 1px dotted black;
    margin: 0 1em 1em 0;
    height: 50px;
  }
  .archivements .item{
	display: inline-block;
	margin: 10px;
	width: 220px;
	border: 1px rgb(0, 0, 0) solid;
	box-sizing: border-box;
	padding: 10px;
	position: relative;
  }
  .archivements .item h1{
  	margin: 0;
  }
  .archivements .item span{
  	position: absolute;
  	right: 0px;
  	top: 0px;
  	font-size: 10px;
  }
  .highscores .item{
  		width: 600px;
  		margin: 0 auto;
  		position: relative;
  }
  .highscores .item .rank{
  	font-size: 20px;
  }
  .highscores .item .score{
  	font-size: 30px;
  }
  .highscores .item .date{
  	float: right;
  }
    .highscores .item .tip{
    	font-size: 10px;
    	padding-right: 5px;
    }
  .activity p {
  	display: inline;
  }
  .activity span{
  	float: right;
  }
  nav{
  	padding-top: 1px;
  }
  nav .active{
  	background-color: rgb(126, 201, 128);
  }
  nav:hover .active{
  	background-color: rgb(229, 216, 187);
  }

  nav li{
  	margin-left:5px;
	display: inline-block;
	width: 100px;
	height: 30px;
	background-color: rgb(229, 216, 187);
	text-align: center;
	border-radius: 9px;
	transition: background-color .2s;
	padding-top: 7px;
  }
  nav li:hover{
  	background-color: rgb(126, 201, 128) !important;
  }
  nav li a{
  	color:black;
  	text-decoration: none;
  }
  </style>
  <script>
  $(function() {
    $( ".column" ).sortable({
      connectWith: ".column",
      handle: ".portlet-header",
      cancel: ".portlet-toggle",
      placeholder: "portlet-placeholder ui-corner-all"
    });
 
    $( ".portlet" )
      .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
      .find( ".portlet-header" )
        .addClass( "ui-widget-header ui-corner-all" )
        .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
 
    $( ".portlet-toggle" ).click(function() {
      var icon = $( this );
      icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
      icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
    });
  });
  </script>
</head>
<body>
<div id="topHeader"> <span> Carlo Theunissen</span></div>

<div id="content">
	<nav>
		<ul>
			<li class="active"><a href="">Home</a></li>
			<li><a href="loginHighscores.php">Highscores</a></li>
		</ul>
	</nav>
	<div class="column">
	  <div class="portlet">
	    <div class="portlet-header">Archivements</div>
	    <div class="portlet-content archivements">
		    <div class="item"><span>3/10</span><h1>10 games</h1><p>Play 10 games in total</p></div>
		    <div class="item"><span>3/10</span><h1>10 games</h1><p>Play 10 games in total</p></div>
		    <div class="item"><span>3/10</span><h1>10 games</h1><p>Play 10 games in total</p></div>
	    </div>
	  </div>
	 
	  <div class="portlet">
	    <div class="portlet-header">Scores</div>
	    <div class="portlet-content highscores">
	    <?php
          $i = 1;
          foreach(OwnHighscore::getAllTimeScores(10) as $item){
            echo '<div class="item"><span class="rank">'.$i.'</span><span class="tip"> '.($item['total'] > 1 ? $item['total'] .'x': '').' </span> <span class="score">'.$item['score'].'</span><span class="date">'.$item['date'].'</span></div>';
            $i ++;
          }
      ?>
	    </div>
	  </div>
	 

	 
	  <div class="portlet">
	    <div class="portlet-header">Activity</div>
	    <div class="portlet-content activity">
	    	<div class="item"><p>Carlo Theunissen is registerd as a new member</p><span>2 minutes ago</span></div>
	    	<div class="item"><p>Kevin has gotton 10 points</p> <span>2 minutes ago</span></div>
	    	<div class="item"><p>Shannon has beaten her own record</p> <span> 2 minutes ago</span></div>
	    	<div class="item"><p>Marco has beaten Wouter is the top 10 ranking</p> <span> 2 minutes ago</span></div>
	    </div>
	  </div>
	 
	 
	</div>
</div>
 
 
</body>
</html>