class LoginProxy extends BaseProxy{
	public constructor($controller:BaseController) {
		super($controller);
		/**注册从服务器返回消息的监听 */
		this.receiveServerMsg(LoginConsts.LOGIN_S2C,this.loginSuccess,this);
	}
	/**
	 * 用户登录
	 */
	public login(userName:string,pwd:string){
		var msg:proto.c_LoginAccount = new proto.c_LoginAccount();
		msg.userName = userName;
		msg.password = pwd;
		this.sendSocketMsg(msg);
	}
	/**
	 * 用户登录成功返回
	 */
	public loginSuccess(obj:any):void{
		this.applyFunc(LoginConsts.LOGIN_S2C,obj)
	}
}