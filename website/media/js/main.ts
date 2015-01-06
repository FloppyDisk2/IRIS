/**
 * Created by carlotheunissen on 17-12-14.
 */

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
            this.parent.showBackButton();

        }, () : void =>{
            /* Error */
        })
    }
}

class BackButton extends buttonStandard implements button{
    private el : HTMLElement = null;


    public installDom() : void{
        this.el = <HTMLElement> document.getElementById("returnButton");
        this.hide();
    }
    public hide(){
        if(this.el === null){
            this.installDom();
        }
        this.el.style.display = "none";
    }
    public show(clickCallback : (Event) => void){
        if(this.el === null){
            this.installDom();
        }
        document.getElementById("return").onclick = clickCallback;
        this.el.style.display = "block";
    }
}


class Login extends buttonStandard implements button{
    constructor(par: Boot){
        super(par);
        this.aniTo = Screens.LOGIN;
    }
    private clickEl : NodeList;
    public installDom() : void{
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
            window.location.href = "login.php?mode=guest";
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
    private buttons: Array<button> = [new Login(this), new Guest(this)];
    private backBut : BackButton = new BackButton(this);
    private currentScreen : Screens;
    private isAni : boolean = false;
    private currentId : string = null;
    private previousId : string = null;
    private aniDuration : number = 500;

    public constructor(){
        this.currentScreen = Screens.HOME;
        this.currentId = "startContainer";
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
};