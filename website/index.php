<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <link rel="stylesheet" href="media/css/normalize.min.css" type="text/css" />
        <link rel="stylesheet" href="media/css/index.css" type="text/css" />
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script type="text/javascript">
        	if((typeof $) === "undefined"){
        		document.write('<scr'+'ipt src="media/js/jquery-1.11.0.min.js"></sc'+'ript>');
        	}
        </script>
        <script type="text/javascript" src="media/js/main.js"></script>

        <script type="text/javascript" src="media/js/cssrefresh.js"></script>
    </head>
    <body class="nojs">
    	<div id="container">
               <div id="containerChar1" id="containerChar1">
                    <div id="char1" class="characterAni"></div>
               </div>
               <div id="loginScreen">
                    <div id="logo">
                    </div>
                    <div id="return"><div id="returnButton"></div> </div>
                    <div id="propContainer">
                        <div id="noscriptContainer" class="containerProperties">
                            <div>
                                <p><span>Javascript :(</span>
                                    You have to enable javascript to play this game.
                            </div>
                        </div>
                        <div id="startContainer" class="containerProperties ">
                            <div>
                                <div class="button loginButton">Login </div>
                                <div class="button registerButton">Registreer <span class="outlinkRight"></div>
                                <div class="button guestButton">Play as guest</div>
                            </div>

                        </div>
                        <div id="guestContainer" class="containerProperties inactive">
                            <div>
                            <p>
                                <span> Warning </span> 
                                You are about to enter guest mode. In this mode, you can't save your progress. 
                            </p>
                            <div class="button smallerText guestContinue">Continue as guest</div>
                            <div class="button loginButton">Login </div>
                            </div>
                        </div>
                        <div id="loginContainer" class="containerProperties inactive">
                           <form>
                                <input type="text" placeholder="Naam" />
                                <input type="password" placeholder="Wachtwoord">
                                <input type="submit" value="Login" id="submit">
                           </form>
                       </div>
                   </div>
               </div>
               <div id="containerChar2">
                    <div id="char2" class="characterAni"></div>
               </div>
        </div>
    </body>
</html>