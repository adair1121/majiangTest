class LoginProxy extends BaseProxy{
	public constructor(controller:BaseController) {
		super(controller);
		/**注册从服务器返回消息的监听 */
		this.receiveServerMsg(LoginConsts.LOGIN_S2C,this.loginSuccess,this);
	}
	/**
	 * 用户登录
	 */
	public login(userName:string,pwd:string){
		var paramObj:any = {
			"uName":userName,
			"pwd":pwd
		}
		this.sendSocketMsg(paramObj)
	}
	/**
	 * 用户登录成功返回
	 */
	public loginSuccess(obj:any):void{
		this.applyFunc(LoginConsts.LOGIN_S2C,obj)
	}
}