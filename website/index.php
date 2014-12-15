<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <link rel="stylesheet" href="media/css/normalize.min.css" type="text/css" />
        <link rel="stylesheet" href="media/css/index.css" type="text/css" />
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script type="text/javascript">
        	if((typeof $) === "undefined"){
        		document.write('<scr'+'ipt src="media/js/jquery-1.11.0.min.js"></sc'+'ript>')
        	}
        </script>
        <script type="text/javascript" src="media/js/main.js"></script>
          <script type="text/javascript" src="media/js/cssrefresh.js"></script>
    </head>
    <body>
    	<div id="container">
               <div id="containerChar1" id="containerChar1">
                    <div id="char1" class="characterAni"></div>
               </div>
               <div id="loginScreen">
                    <div id="logo"></div>
                   <form>
                        <input type="text" placeholder="Naam" />
                        <input type="password" placeholder="Wachtwoord">
                        <input type="submit" value="Login" id="submit">
                   </form>
               </div>
               <div id="containerChar2">
                    <div id="char2" class="characterAni"></div>
               </div>
        </div>
    </body>
</html>