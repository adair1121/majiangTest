class ViewLogin extends BaseEuiView{
	public btnLogin:eui.Image;
	public wxLogin:eui.Image;
	public ip:eui.EditableText;
	public constructor($controller:BaseController,$parent:egret.DisplayObjectContainer) {
		super($controller,$parent);
		this.skinName = "ViewLoginSkin";
	}
	/**
	 * 对面板进行初始化
	 */
	public initUI():void{
		super.initUI();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
	}
	/**
	 * 对面板数据进行初始化
	 */
	public initData():void{
		super.initData();
	}
	/**
	 * 面板开启执行函数
	 */
	public open(param:any[]):void{

	}
	/**
	 * 面板关闭执行函数
	 */
	public close(param:any[]):void{
		this.clickState = false;
	}
	private clickState:boolean = false;
	private onTouchHandler(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.btnLogin:
				if(!this.clickState){
					this.clickState = true;
					var ip:string = this.ip.text;
					if(!ip){
						ip = Config.gameHost;
					}
					SocketManager.getInstance().connectServer(ip,Config.gamePort,()=>{
						if(Config.connectState){
							this.clickState = false;
							var account = GlobalFunc.guid();
							var pwd ="111111";
							// egret.localStorage.clear();
							// if(!account){
							// 	account = GlobalFunc.guid();
							// 	egret.localStorage.setItem("account",account);
							// }
							// if(!pwd){
							// 	pwd = "111111";
							// 	egret.localStorage.setItem("pwd",pwd);
							// }
							this.applyFunc(LoginConsts.LOGIN_C2S,{userName:account,pwd:pwd});
							//测试代码
							// App.ViewManager.close(ViewConst.Login);
							// App.ViewManager.open(ViewConst.Start);
						}else{
							alert("连接错误");
							this.clickState = false;
						}
				 	},this); 
				}else{
					alert("正在连接")
				}
				
				break;
			case this.wxLogin:
				break;
		}
	}
	public loginSuccess():void{
		
	}
}