var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoginController = (function (_super) {
    __extends(LoginController, _super);
    function LoginController() {
        var _this = _super.call(this) || this;
        //初始化model
        _this.loginModel = new LoginModel(_this);
        //初始化ui
        _this.loginView = new ViewLogin(_this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Login, _this.loginView);
        //初始化proxy
        _this.loginProxy = new LoginProxy(_this);
        /**注册C2S */
        _this.registerFunc(LoginConsts.LOGIN_C2S, _this.onLogin, _this);
        /**注册s2c */
        _this.registerFunc(LoginConsts.LOGIN_S2C, _this.loginSuccess, _this);
        return _this;
    }
    /**
     * 请求登陆处理
     * @param userName
     * @param pwd
     */
    LoginController.prototype.onLogin = function (dataObj) {
        this.loginProxy.login(dataObj.userName, dataObj.pwd);
    };
    /**
     * 登陆成功处理
     */
    LoginController.prototype.loginSuccess = function (msg) {
        if (msg.isSuccess) {
            //保存数据
            this.loginModel.userInfo = msg.userInfo;
            //本模块UI处理
            this.loginView.loginSuccess();
            //UI跳转
            App.ViewManager.close(ViewConst.Login);
            App.ViewManager.open(ViewConst.Start);
        }
        else {
            alert(msg.errMsg);
        }
        // var model:BaseModel = this.getControllerModel(ControllerConst.Login);
    };
    return LoginController;
}(BaseController));
__reflect(LoginController.prototype, "LoginController");
//# sourceMappingURL=LoginController.js.map