class LoginController extends BaseController{
	/**本模块的数据存储 */
	private loginModel:LoginModel;
	/**本模块ui */
	private loginView:ViewLogin;
	/**本模块proxy */
	private loginProxy:LoginProxy;
	public constructor() {
		super();
		//初始化model
		this.loginModel = new LoginModel(this);
		//初始化ui
		this.loginView = new ViewLogin(this,LayerManager.UI_Main);
		App.ViewManager.register(ViewConst.Login,this.loginView)
		//初始化proxy
		this.loginProxy = new LoginProxy(this)
		/**注册C2S */
		this.registerFunc(LoginConsts.LOGIN_C2S,this.onLogin,this);
		/**注册s2c */
		this.registerFunc(LoginConsts.LOGIN_S2C,this.loginSuccess,this);
	}
	/**
     * 请求登陆处理
     * @param userName
     * @param pwd
     */
    private onLogin(dataObj:any):void{
        this.loginProxy.login(dataObj.userName, dataObj.pwd);
    }
	/**
     * 登陆成功处理
     */
    private loginSuccess(msg:proto.s_LoginAccount):void{
		if(msg.isSuccess){
			 //保存数据
			this.loginModel.userInfo = msg.userInfo;
			//本模块UI处理
			this.loginView.loginSuccess();
			//UI跳转
			App.ViewManager.close(ViewConst.Login);

			App.ViewManager.open(ViewConst.Start);
		}else{
			alert(msg.errMsg);
		}
       

        // var model:BaseModel = this.getControllerModel(ControllerConst.Login);
    }
}