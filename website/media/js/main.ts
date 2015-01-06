/**
 * Created by carlotheunissen on 17-12-14.
 */

interface button{
    installDom() : void;
}

class BackButton implements button{
    private el : HTMLElement = null;
    private parent : Boot;
    constructor(par : Boot){
        this.parent = par;
    }

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
    public show(){
        if(this.el === null){
            this.installDom();
        }
        this.el.style.display = "block";
    }
}


class Login implements  button{
    private clickEl : HTMLElement;
    private parent : Boot;
    constructor(par : Boot){
        this.parent = par;
    }
    public installDom() : void{
        this.clickEl = <HTMLElement> document.getElementsByClassName('loginButton')[0];
        this.clickEl.addEventListener("click", this.click);
    }
    private click = (e : MouseEvent) : void => {
        this.parent.showBackButton();
    }
}
enum Screens {
    HOME,
    LOGIN,
    GUEST
}

class Boot {
    private buttons:Array<button> = [new Login(this)];
    private backBut : BackButton = new BackButton(this);
    private currentScreen : Screens;

    public constructor(){
        this.currentScreen = Screens.HOME;
    }

    public showBackButton(){
        this.backBut.show();
    }

    public hideBackButton(){
        this.backBut.hide();
    }

    private isAni : boolean = false;
    public switchScreen(name : Screens, succes :() => void, error :() => void): void{
        if(this.isAni || this.currentScreen === name){
            error();
            return;
        }

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