var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by carlotheunissen on 17-12-14.
 */
var RegisterForm = (function () {
    function RegisterForm(backBut) {
        this.backBut = backBut;
        this.element = document.getElementById("registerForm");
        this.form = this.element.getElementsByTagName('form')[0];
    }
    RegisterForm.prototype.setOnhide = function (callback) {
        this.onhide = callback;
    };
    RegisterForm.prototype.submitData = function (succes, username, password, email, address, country) {
        if (address === void 0) { address = ''; }
        if (country === void 0) { country = ''; }
        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange = function () {
            if (oReq.readyState == 4) {
                if (oReq.status == 200) {
                    if (oReq.responseText === 'Ok') {
                        alert('je bent geregistreerd!');
                        succes();
                    }
                    else {
                        alert(oReq.responseText);
                    }
                }
                else {
                }
            }
        };
        oReq.open("post", "connectors/createUser.php" + ((/\?/).test("connectors/createUser.php") ? "&" : "?") + (new Date()).getTime(), true);
        oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var send = 'username=' + username + '&password=' + password + '&email=' + email;
        if (address.trim() !== '') {
            send += "&address=" + address;
        }
        if (country.trim() !== '') {
            send += "&country=" + country;
        }
        oReq.send(send);
    };
    RegisterForm.prototype.show = function () {
        var _this = this;
        this.element.style.display = "block";
        this.backBut.hide();
        this.backBut.show(function (E) {
            console.log('ja');
            _this.backBut.hide();
            _this.hide();
        });
        //  this.form.requestAutocomplete();
        this.form.onsubmit = function (e) {
            e.preventDefault();
            var formData = _this.form.getElementsByTagName('input');
            var username = formData[0].value, password = formData[1].value, repassword = formData[2].value, email = formData[3].value, address = formData[4].value, country = formData[5].value;
            var error = false;
            for (var i = 0; i <= 3; i++) {
                var out = formData[i];
                if (out.value.trim() === '') {
                    out.classList.add("error");
                    error = true;
                }
            }
            if (password.trim() !== '' && repassword.trim() !== '' && repassword !== password) {
                formData[2].classList.add("error");
                formData[1].classList.add("error");
                error = true;
            }
            var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/;
            if (!re.test(email)) {
                console.log(email);
                error = true;
                formData[3].classList.add("error");
            }
            if (error) {
                return;
            }
            _this.submitData(function () {
                for (var i = 0; i <= 3; i++) {
                    var out = formData[i];
                    out.value = '';
                }
                _this.hide();
            }, username, password, email, address, country);
        };
    };
    RegisterForm.prototype.hide = function () {
        this.form.onsubmit = null;
        this.element.style.display = "none";
        if (this.onhide !== null)
            this.onhide();
    };
    return RegisterForm;
})();
var buttonStandard = (function () {
    function buttonStandard(par) {
        var _this = this;
        this.click = function (e) {
            _this.parent.switchScreen(_this.aniTo, function () {
                _this.parent.backBut.show(function () {
                    _this.parent.hideLoad();
                    _this.parent.showBackButton();
                });
            }, function () {
                /* Error */
            });
        };
        this.parent = par;
    }
    return buttonStandard;
})();
var BackButton = (function (_super) {
    __extends(BackButton, _super);
    function BackButton() {
        _super.apply(this, arguments);
        this.el = null;
    }
    BackButton.prototype.installDom = function () {
        this.el = document.getElementsByClassName("return");
        this.hide();
    };
    BackButton.prototype.hide = function () {
        if (this.el === null) {
            this.installDom();
        }
        for (var i = 0, len = this.el.length; i < len; i++) {
            this.el[i].style.display = "none";
        }
    };
    BackButton.prototype.show = function (clickCallback) {
        if (this.el === null) {
            this.installDom();
        }
        for (var i = 0, len = this.el.length; i < len; i++) {
            console.log(i);
            this.el[i].style.display = "block";
            this.el[i].onclick = clickCallback;
        }
    };
    return BackButton;
})(buttonStandard);
var RegisterButton = (function (_super) {
    __extends(RegisterButton, _super);
    function RegisterButton() {
        _super.apply(this, arguments);
    }
    RegisterButton.prototype.installDom = function () {
        var _this = this;
        this.form = new RegisterForm(this.parent.backBut);
        this.form.setOnhide(function () {
            _this.parent.showContainer();
        });
        this.el = document.getElementsByClassName("registerButton")[0];
        this.el.addEventListener("click", function (E) {
            _this.parent.hideContainer();
            _this.form.show();
        });
    };
    return RegisterButton;
})(buttonStandard);
var Login = (function (_super) {
    __extends(Login, _super);
    function Login(par) {
        _super.call(this, par);
        this.aniTo = 1 /* LOGIN */;
    }
    Login.prototype.installForm = function () {
        var _this = this;
        var loginForm = document.getElementById("loginForm");
        loginForm.onsubmit = function (e) {
            e.preventDefault();
            loginForm.getElementsByTagName('p')[0].innerText = '';
            var error = false;
            for (var i = 0, len = loginForm.getElementsByTagName('input').length; i + 1 < len; i++) {
                if (loginForm.getElementsByTagName('input')[i].value.length === 0) {
                    error = true;
                    loginForm.getElementsByTagName('input')[i].classList.add('error');
                }
                else {
                    loginForm.getElementsByTagName('input')[i].classList.remove('error');
                }
            }
            if (error) {
                return;
            }
            _this.parent.showLoad();
            _this.parent.backBut.hide();
            var oReq = new XMLHttpRequest();
            _this.parent.backBut.show(function () {
                oReq.abort();
                _this.parent.hideLoad();
                _this.parent.hideBackButton();
                _this.parent.showBackButton();
            });
            oReq.onreadystatechange = function () {
                if (oReq.readyState == 4) {
                    if (oReq.status == 200) {
                        if (oReq.responseText !== 'Ok') {
                            loginForm.getElementsByTagName('p')[0].innerText = "Ingevoerde data komt niet overeen met de database";
                            _this.parent.hideLoad();
                            _this.parent.hideBackButton();
                            _this.parent.showBackButton();
                        }
                        else {
                            window.location.href = "login.php?mode=user";
                        }
                    }
                    else {
                        loginForm.getElementsByTagName('p')[0].innerText = "Probeer het opnieuw";
                        _this.parent.hideLoad();
                        _this.parent.hideBackButton();
                        _this.parent.showBackButton();
                    }
                }
            };
            oReq.open("post", "connectors/loginEntrance.php" + ((/\?/).test("connectors/loginEntrance.php") ? "&" : "?") + (new Date()).getTime(), true);
            oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            oReq.send('gb=' + loginForm.getElementsByTagName('input')[0].value + '&ww=' + loginForm.getElementsByTagName('input')[1].value);
        };
    };
    Login.prototype.installDom = function () {
        this.installForm();
        this.clickEl = document.getElementsByClassName('loginButton');
        for (var i = 0, len = this.clickEl.length; i < len; i++) {
            this.clickEl[i].addEventListener("click", this.click);
        }
    };
    return Login;
})(buttonStandard);
var Guest = (function (_super) {
    __extends(Guest, _super);
    function Guest(par) {
        var _this = this;
        _super.call(this, par);
        this.installSecondButton = function () {
            var clickEl = document.getElementsByClassName('guestContinue')[0];
            clickEl.addEventListener("click", function () {
                _this.parent.showLoad();
                _this.parent.backBut.hide();
                var oReq = new XMLHttpRequest();
                _this.parent.backBut.show(function () {
                    oReq.abort();
                    _this.parent.hideLoad();
                    _this.parent.hideBackButton();
                    _this.parent.showBackButton();
                    document.getElementById('info').innerText = "";
                });
                oReq.onreadystatechange = function () {
                    if (oReq.readyState == 4) {
                        if (oReq.status == 200) {
                            window.location.href = "login.php?mode=guest&code=" + oReq.responseText;
                        }
                        else {
                            document.getElementById('info').innerText = "Probeer het opnieuw";
                            _this.parent.hideLoad();
                            _this.parent.hideBackButton();
                            _this.parent.showBackButton();
                        }
                    }
                };
                oReq.open("post", "connectors/guestEntrance.php" + ((/\?/).test("connectors/guestEntrance.php") ? "&" : "?") + (new Date()).getTime(), true);
                oReq.send();
            });
        };
        this.aniTo = 2 /* GUEST */;
    }
    Guest.prototype.installDom = function () {
        this.installSecondButton();
        this.clickEl = document.getElementsByClassName('guestButton');
        for (var i = 0, len = this.clickEl.length; i < len; i++) {
            this.clickEl[i].addEventListener("click", this.click);
        }
    };
    return Guest;
})(buttonStandard);
var Screens;
(function (Screens) {
    Screens[Screens["HOME"] = 0] = "HOME";
    Screens[Screens["LOGIN"] = 1] = "LOGIN";
    Screens[Screens["GUEST"] = 2] = "GUEST";
})(Screens || (Screens = {}));
var Boot = (function () {
    function Boot() {
        this.buttons = [new Login(this), new Guest(this), new RegisterButton(this)];
        this.backBut = new BackButton(this);
        this.isAni = false;
        this.currentId = null;
        this.previousId = null;
        this.aniDuration = 500;
        this.registerForm = null;
        this.currentScreen = 0 /* HOME */;
        this.currentId = "startContainer";
    }
    Boot.prototype.hideContainer = function () {
        document.getElementById("loginScreen").style.display = "none";
    };
    Boot.prototype.showContainer = function () {
        document.getElementById("loginScreen").style.display = "block";
    };
    Boot.prototype.showBackButton = function () {
        var _this = this;
        this.backBut.show(function (e) {
            if (_this.currentId !== null && _this.currentId !== 'startContainer') {
                _this.animate('startContainer', function () {
                }, true);
            }
            _this.hideBackButton();
        });
    };
    Boot.prototype.hideBackButton = function () {
        this.backBut.hide();
    };
    Boot.prototype.showLoad = function () {
        if (this.currentId !== null) {
            document.getElementById(this.currentId).classList.add('inactive');
        }
        document.getElementById("loadContainer").classList.remove('inactive');
    };
    Boot.prototype.hideLoad = function () {
        if (this.currentId !== null) {
            document.getElementById(this.currentId).classList.remove('inactive');
        }
        document.getElementById("loadContainer").classList.add('inactive');
    };
    Boot.prototype.animate = function (id, succes, reverse) {
        var _this = this;
        if (reverse === void 0) { reverse = false; }
        if (this.isAni) {
            return;
        }
        this.isAni = true;
        if (this.currentId !== null) {
            this.previousId = this.currentId;
            document.getElementById(this.currentId).style.left = (reverse ? '-' : '') + '230px';
            document.getElementById(this.currentId).classList.add('ani');
        }
        this.currentId = id;
        if (reverse) {
            document.getElementById(id).classList.remove('inactive');
            document.getElementById(id).style.left = '230px';
        }
        setTimeout(function () {
            document.getElementById(id).classList.remove('inactive');
            document.getElementById(id).classList.add('ani');
            document.getElementById(id).style.left = '0px';
        }, 10);
        setTimeout(function () {
            _this.isAni = false;
            if (_this.previousId !== null) {
                document.getElementById(_this.previousId).classList.add('inactive');
                document.getElementById(_this.previousId).classList.remove('ani');
                document.getElementById(_this.currentId).classList.remove('ani');
                document.getElementById(_this.previousId).style.left = '';
            }
            succes();
        }, this.aniDuration + 10);
    };
    Boot.prototype.switchScreen = function (name, succes, error) {
        console.log('switchScreen');
        if (this.isAni || this.currentScreen === name) {
            error();
            return;
        }
        var id;
        switch (name) {
            case 1 /* LOGIN */:
                id = "loginContainer";
                break;
            case 2 /* GUEST */:
                id = "guestContainer";
                break;
            case 0 /* HOME */:
                id = "startContainer";
                break;
            default:
                return;
        }
        this.animate(id, succes);
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