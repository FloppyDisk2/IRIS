/**
 * Created by carlotheunissen on 17-12-14.
 */
var BackButton = (function () {
    function BackButton(par) {
        this.el = null;
        this.parent = par;
    }
    BackButton.prototype.installDom = function () {
        this.el = document.getElementById("returnButton");
        this.hide();
    };
    BackButton.prototype.hide = function () {
        if (this.el === null) {
            this.installDom();
        }
        this.el.style.display = "none";
    };
    BackButton.prototype.show = function () {
        if (this.el === null) {
            this.installDom();
        }
        this.el.style.display = "block";
    };
    return BackButton;
})();
var Login = (function () {
    function Login(par) {
        var _this = this;
        this.click = function (e) {
            _this.parent.showBackButton();
        };
        this.parent = par;
    }
    Login.prototype.installDom = function () {
        this.clickEl = document.getElementsByClassName('loginButton')[0];
        this.clickEl.addEventListener("click", this.click);
    };
    return Login;
})();
var Screens;
(function (Screens) {
    Screens[Screens["HOME"] = 0] = "HOME";
    Screens[Screens["LOGIN"] = 1] = "LOGIN";
    Screens[Screens["GUEST"] = 2] = "GUEST";
})(Screens || (Screens = {}));
var Boot = (function () {
    function Boot() {
        this.buttons = [new Login(this)];
        this.backBut = new BackButton(this);
        this.isAni = false;
        this.currentScreen = 0 /* HOME */;
    }
    Boot.prototype.showBackButton = function () {
        this.backBut.show();
    };
    Boot.prototype.hideBackButton = function () {
        this.backBut.hide();
    };
    Boot.prototype.switchScreen = function (name, succes, error) {
        if (this.isAni || this.currentScreen === name) {
            error();
            return;
        }
    };
    Boot.prototype.start = function () {
        Boot.call(this.backBut);
        this.installDom();
    };
    Boot.prototype.installDom = function () {
        for (var i in this.buttons) {
            Boot.call(this.buttons[i]);
        }
    };
    Boot.call = function (obj) {
        obj.installDom();
    };
    return Boot;
})();
var insals = new Boot();
window.onload = function () {
    var test = document.body;
    test.className = "js";
    insals.start();
};
//# sourceMappingURL=main.js.map