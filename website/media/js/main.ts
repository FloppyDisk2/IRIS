/**
 * Created by carlotheunissen on 17-12-14.
 */
class InfoBox{
    private static element : HTMLElement = null;
    private static backbut : BackButton = null;
    private static checkElement() : void{
        this.element = this.element === null ? document.getElementById("infoBox") : this.element;
    }
    public static showInfoBox(backbut : BackButton) : void{
        this.backbut = backbut;
        this.checkElement();
        this.element.style.display = 'block';
        backbut.hide();
        var timer = setTimeout(() => {
            this.hide()
        }, 2000);
        backbut.show((E : Event) => {
            clearTimeout(timer);
            this.hide();
        });

    }
    public static hide(){
        if(this.backbut !== null){
            this.backbut.hide();
            this.backbut = null;
        }
        this.element.style.display = 'none';

    }
}
class RegisterForm{
    private element : HTMLElement;
    private form : HTMLElement;
    private backBut : BackButton;
    private onhide : () => void;
    constructor(backBut : BackButton){
        this.backBut = backBut;
        this.element = document.getElementById("registerForm");
        this.form = this.element.getElementsByTagName('form')[0];
    }
    public setOnhide(callback : () => void){
        this.onhide = callback;
    }
    private clean() : void {

    }
    private submitData(succes : () => void, username : string, password : string, email : string,   address : string = '', country: string = '') : void{

        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange = () => {
            if (oReq.readyState == 4) {
                if (oReq.status == 200) {
                    var json : any = JSON.parse(oReq.responseText);
                    if(json.succes){
                        InfoBox.showInfoBox(this.backBut);
                        this.hide();

                    }
                    var formData : NodeList = this.form.getElementsByTagName('input');
                    for(var i : number = 0, len = json.error.length; i<len; i++){
                        switch(json.error[i]){
                            case 'general':
                                alert('Unknow error');
                                return;
                                break;
                            case 'nameError':
                                (<HTMLInputElement>  (<HTMLInputElement> formData[0].parentNode).getElementsByClassName('error')[0]).innerText = "This username is already taken";
                                (<HTMLInputElement> formData[0]).classList.add("error");
                                break;
                            case 'emailError':
                                (<HTMLInputElement> formData[3]).classList.add("error");
                                (<HTMLInputElement>  (<HTMLInputElement> formData[3].parentNode).getElementsByClassName('error')[0]).innerText = "This email address has already 2 accounts.";
                                break;
                        }
                    }

                } else {
                    /*internet error*/
                }
            }
        };
        oReq.open("post", "connectors/createUser.php" + ((/\?/).test("connectors/createUser.php") ? "&" : "?") + (new Date()).getTime(), true);
        oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var send : String = 'username='+username+'&password='+password+'&email='+email;
        if(address.trim() !== ''){
            send += "&address="+address;
        }
        if(country.trim() !== ''){
            send += "&country="+country;
        }

        oReq.send(send);

    }

    public show() : void{
        this.element.style.display = "block";
        this.backBut.hide();
        this.backBut.show((E : Event) => {
            console.log('ja');
            this.backBut.hide();
            this.hide();
        })
      //  this.form.requestAutocomplete();
        this.form.onsubmit = (e : Event) => {
            e.preventDefault();
            var formData : NodeList = this.form.getElementsByTagName('input');

            var username : string = (<HTMLInputElement> formData[0]).value,
                password : string = (<HTMLInputElement> formData[1]).value,
                repassword : string = (<HTMLInputElement> formData[2]).value,
                email : string = (<HTMLInputElement> formData[3]).value,
                address : string = (<HTMLInputElement> formData[4]).value,
                country : string = (<HTMLInputElement> formData[5]).value;

            var error : boolean = false;
            for(var i = 0; i <= 3; i++){
                var out : HTMLInputElement = <HTMLInputElement> formData[i];
                if(out.value.trim() === ''){
                    out.classList.add("error");
                    error = true;
                } else {
                    (<HTMLInputElement> formData[i]).classList.remove("error");
                }
                (<HTMLInputElement>  (<HTMLInputElement> formData[i].parentNode).getElementsByClassName('error')[0]).innerText = "";

            }
            if(password.trim() !== '' && username.trim().length < 4){
                (<HTMLInputElement> formData[0]).classList.add("error");
                (<HTMLInputElement>  (<HTMLInputElement> formData[0].parentNode).getElementsByClassName('error')[0]).innerText = "Username is too short. Min. 4 characters";
                error = true;
            }
            if(password.trim() !== '' && password.trim().length < 6){
                (<HTMLInputElement> formData[1]).classList.add("error");
                (<HTMLInputElement>  (<HTMLInputElement> formData[1].parentNode).getElementsByClassName('error')[0]).innerText = "Password is too short. Min. 6 characters";
                error = true;
            }
            if(password.trim() !== '' && repassword.trim() !== '' && repassword !== password){
                (<HTMLInputElement> formData[2]).classList.add("error");
                (<HTMLInputElement> formData[1]).classList.add("error");
                (<HTMLInputElement>  (<HTMLInputElement> formData[2].parentNode).getElementsByClassName('error')[0]).innerText = "The passwords are different";
                error = true;
            }
            var re : RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/;
            if(email.trim() !== '' && !re.test(email)){
                console.log(email);
                error = true;
                (<HTMLInputElement>  (<HTMLInputElement> formData[3].parentNode).getElementsByClassName('error')[0]).innerText = "Invalid :(";
                (<HTMLInputElement> formData[3]).classList.add("error");
            }
            if(error){
                return;
            }

            this.submitData(() => {

                for(var i = 0; i <= 3; i++){
                    var out : HTMLInputElement = <HTMLInputElement> formData[i];
                    out.value = '';
                }
                this.hide();
            },username, password,email,address,country);
        }

    }

    public hide() : void{
        this.form.onsubmit = null;
        this.element.style.display = "none";
        this.backBut.hide();
        if(this.onhide !== null)
        this.onhide();
    }
}

interface button{
    installDom() : void;
}
class buttonStandard{
    protected parent : Boot;
    protected aniTo : Screens;
    constructor(par : Boot){
        this.parent = par;
    }
    protected click = (e : MouseEvent) : void => {
        this.parent.switchScreen(this.aniTo, () : void =>{
            this.parent.backBut.show(() : void =>{
                this.parent.hideLoad();
                this.parent.showBackButton();
            });

        }, () : void =>{
            /* Error */
        })
    }
}

class BackButton extends buttonStandard implements button{
    private el : NodeList = null;


    public installDom() : void{
        this.el = document.getElementsByClassName("return");
        this.hide();
    }
    public hide(){
        if(this.el === null){
            this.installDom();
        }
        for(var i = 0, len = this.el.length; i < len; i++){
            (<HTMLElement>this.el[i]).style.display = "none";
        }

    }
    public show(clickCallback : (Event) => void){
        if(this.el === null){
            this.installDom();
        }
        for(var i = 0, len = this.el.length; i < len; i++){
            (<HTMLElement>this.el[i]).style.display = "block";
            (<HTMLElement>this.el[i]).onclick = clickCallback
        }
    }
}

class RegisterButton extends buttonStandard implements button {
    private el : HTMLElement;
    private form : RegisterForm;


    public installDom() : void{
        this.form = new RegisterForm(this.parent.backBut);
        this.form.setOnhide(() => {
            this.parent.showContainer();
        });
        this.el = <HTMLElement> document.getElementsByClassName("registerButton")[0];
        this.el.addEventListener("click", (E : Event) :void => {
            this.parent.hideContainer();
            this.form.show();
        });
    }
}
class Login extends buttonStandard implements button{
    constructor(par: Boot){
        super(par);
        this.aniTo = Screens.LOGIN;
    }
    private clickEl : NodeList;
    private installForm() : void{
        var loginForm : HTMLElement = <HTMLElement> document.getElementById("loginForm");
        loginForm.onsubmit = (e : Event) => {
            e.preventDefault();
            loginForm.getElementsByTagName('p')[0].innerText = '';
            var error : boolean = false;
            for(var i : number = 0, len : number = loginForm.getElementsByTagName('input').length; i+1 < len; i++ ){
                if(loginForm.getElementsByTagName('input')[i].value.length === 0){
                    error = true;
                    loginForm.getElementsByTagName('input')[i].classList.add('error');
                } else {
                    loginForm.getElementsByTagName('input')[i].classList.remove('error');
                }
            }
            if(error){
                return;
            }

            this.parent.showLoad();
            this.parent.backBut.hide();
            var oReq = new XMLHttpRequest();
            this.parent.backBut.show((): void =>{
                oReq.abort();
                this.parent.hideLoad();
                this.parent.hideBackButton();
                this.parent.showBackButton();
            });
            oReq.onreadystatechange = () => {
                if (oReq.readyState == 4) {
                    if (oReq.status == 200) {
                        if(oReq.responseText !== 'Ok'){
                            loginForm.getElementsByTagName('p')[0].innerText = "Ingevoerde data komt niet overeen met de database";
                            this.parent.hideLoad();
                            this.parent.hideBackButton();
                            this.parent.showBackButton();
                        } else {
                            window.location.href = "login.php?mode=user";
                        }

                    } else {
                        loginForm.getElementsByTagName('p')[0].innerText = "Probeer het opnieuw";
                        this.parent.hideLoad();
                        this.parent.hideBackButton();
                        this.parent.showBackButton();
                    }
                }
            };
            oReq.open("post", "connectors/loginEntrance.php" + ((/\?/).test("connectors/loginEntrance.php") ? "&" : "?") + (new Date()).getTime(), true);
            oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            oReq.send('gb=' + loginForm.getElementsByTagName('input')[0].value + '&ww=' + loginForm.getElementsByTagName('input')[1].value);
        };
    }
    public installDom() : void{
        this.installForm();
        this.clickEl = document.getElementsByClassName('loginButton');
        for(var i =0, len = this.clickEl.length; i < len; i++){
            this.clickEl[i].addEventListener("click", this.click);
        }
    }

}
class Guest extends buttonStandard implements button{
    private clickEl : NodeList;
    constructor(par: Boot){
        super(par);
        this.aniTo = Screens.GUEST;
    }
    private installSecondButton = () : void => {
        var clickEl : HTMLElement = <HTMLElement> document.getElementsByClassName('guestContinue')[0];
        clickEl.addEventListener("click", () : void => {
            this.parent.showLoad();
            this.parent.backBut.hide();
            var oReq = new XMLHttpRequest();
            this.parent.backBut.show((): void =>{
                oReq.abort();
                this.parent.hideLoad();
                this.parent.hideBackButton();
                this.parent.showBackButton();
                document.getElementById('info').innerText = "";
            });
            oReq.onreadystatechange = () => {
                if (oReq.readyState == 4) {
                    if (oReq.status == 200) {
                        window.location.href = "login.php?mode=guest&code="+oReq.responseText;
                    } else {
                        document.getElementById('info').innerText = "Probeer het opnieuw";
                        this.parent.hideLoad();
                        this.parent.hideBackButton();
                        this.parent.showBackButton();
                    }
                }
            };
            oReq.open("post", "connectors/guestEntrance.php" + ((/\?/).test("connectors/guestEntrance.php") ? "&" : "?") + (new Date()).getTime(), true);
            oReq.send();
        });
    }
    public installDom() : void{
        this.installSecondButton();
        this.clickEl = document.getElementsByClassName('guestButton');
        for(var i =0, len = this.clickEl.length; i < len; i++){
            this.clickEl[i].addEventListener("click", this.click);
        }
    }

}
enum Screens {
    HOME,
    LOGIN,
    GUEST
}

class Boot {
    private buttons: Array<button> = [new Login(this), new Guest(this), new RegisterButton(this)];
    public backBut : BackButton = new BackButton(this);
    private currentScreen : Screens;
    private isAni : boolean = false;
    private currentId : string = null;
    private previousId : string = null;
    private aniDuration : number = 500;
    private registerForm : RegisterForm = null;
    public constructor(){
        this.currentScreen = Screens.HOME;
        this.currentId = "startContainer";

    }
    public hideContainer(){
        document.getElementById("loginScreen").style.display = "none";
    }
    public showContainer(){
        document.getElementById("loginScreen").style.display = "block";

    }
    public showBackButton(){
        this.backBut.show((e : Event) : void => {
            if(this.currentId !== null && this.currentId !== 'startContainer'){
                this.animate('startContainer', ():void=>{}, true);
            }
            this.hideBackButton();
        });
    }

    public hideBackButton(){
        this.backBut.hide();
    }
    public showLoad() {
        if(this.currentId !== null) {
            document.getElementById(this.currentId).classList.add('inactive');
        }
        document.getElementById("loadContainer").classList.remove('inactive');
    }
    public hideLoad(){
        if(this.currentId !== null) {
            document.getElementById(this.currentId).classList.remove('inactive');
        }
        document.getElementById("loadContainer").classList.add('inactive');
    }
    private animate(id : string, succes :() => void,  reverse: boolean = false){

        if(this.isAni){
            return;
        }
        this.isAni = true;
        if(this.currentId !== null){
            this.previousId = this.currentId;
            document.getElementById(this.currentId).style.left = (reverse ? '-' : '') + '230px';
            document.getElementById(this.currentId).classList.add('ani');
        }

        this.currentId = id;
        if(reverse){
            document.getElementById(id).classList.remove('inactive');
            document.getElementById(id).style.left = '230px';
        }
        setTimeout(function(){
            document.getElementById(id).classList.remove('inactive');
            document.getElementById(id).classList.add('ani');
            document.getElementById(id).style.left = '0px';
        },10)


        setTimeout(() => {
            this.isAni = false;
            if(this.previousId !== null){
                document.getElementById(this.previousId).classList.add('inactive');
                document.getElementById(this.previousId).classList.remove('ani');
                document.getElementById(this.currentId).classList.remove('ani');
                document.getElementById(this.previousId).style.left = '';
            }
            succes();
        }, this.aniDuration+10);
    }


    public switchScreen(name : Screens, succes :() => void, error :() => void): void{
        console.log('switchScreen');
        if(this.isAni || this.currentScreen === name){
            error();
            return;
        }
        var id : string;
        switch(name){
            case Screens.LOGIN:
                    id = "loginContainer";
                break;
            case Screens.GUEST:
                    id = "guestContainer";
                break;
            case Screens.HOME:
                    id="startContainer";
                break;
            default :

                return;
        }
        this.animate(id,succes);

    }

    public start():void {
        Boot.call(this.backBut);
        this.installDom();

    }

    public installDom():void {
        for (var i in this.buttons) {
            Boot.call( this.buttons[i] );
        }
    }
    private static call(obj : button){
        obj.installDom();
    }
}

var insals : Boot = new Boot();
window.onload = function() : void {
    var test:HTMLBodyElement = <HTMLBodyElement> document.body;
    test.className = "js";
    insals.start();
   var t =  document.getElementById("registerForm").getElementsByTagName("input");
    for(var i = 0, len = t.length; i < len; i++){
        t[i].addEventListener("keyup", function(){
            this.style.fontSize = Math.max(16 - Math.floor(this.value.length / 17) * 2, 12) + "px";
        });
    }
};