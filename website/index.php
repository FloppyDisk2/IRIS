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

    </head>
    <body class="nojs">
    	<div id="container">
               <div id="containerChar1">
                    <div id="char1" class="characterAni"></div>
               </div>
               <div id="loginScreen" style="display:none">
                    <div id="logo">
                    </div>
                    <div id="return"><div id="returnButton"></div> </div>
                    <div id="propContainer">
                        <div id="noscriptContainer" class="containerProperties">
                            <div>
                                <p><span>Javascript :(</span>
                                    You have to enable javascript to play this game.</p>
                            </div>
                        </div>
                        <div id="loadContainer" class="containerProperties inactive">
                            <div></div>
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
                            <b id="info"></b>
                            <p>
                                <span> Warning </span> 
                                You are about to enter guest mode. In this mode, you can't save your progress. 
                            </p>
                            <div class="button smallerText guestContinue">Continue as guest</div>
                            <div class="button loginButton">Login </div>
                            </div>
                        </div>
                        <div id="loginContainer" class="containerProperties inactive">
                           <form id="loginForm">
                               <p></p>
                                <input type="text" placeholder="Naam" />
                                <input type="password" placeholder="Wachtwoord">
                                <input type="submit" value="Login" id="submit">
                           </form>
                       </div>
                   </div>
               </div>
               <div id="registerForm" style="display:block">
                <form>
                    <table>
                        <tr> <td> Username </td><td><input type="text"></td><td>(At least 4 characters)</td></tr>
                        <tr> <td> Password </td><td><input type="text"></td><td>(At least 6 characters)</td></tr>
                        <tr> <td> Confirm password </td><td><input type="password"></td></tr>
                        <tr> <td> E-mail </td><td><input type="text"></td></tr>
                        <tr> <td> Address </td><td><input type="text"></td></tr>
                        <tr> <td> Country </td><td><input type="text"></td></tr>
                    </table>
                    <span> * Is Required. </span>
                    <input type="submit" value="submit">
                </form>
               </div>
               <div id="containerChar2">
                    <div id="char2" class="characterAni"></div>
               </div>
        </div>
    </body>
</html>