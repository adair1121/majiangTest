class PlayerRoleInfo extends eui.Component{
	public playerIcon:eui.Image;
	public playerName:eui.Label;
	public playerCardNum:eui.Label;
	public infoGroup:eui.Group;
	public userId:number;
	public seat:number;
	public leaveLabel:eui.Label;
	public constructor() {
		super();
		this.skinName = "PlayerRoleInfoSkin";
	}
	protected childrenCreated():void{
		this.infoGroup.visible = false;
	}
	public setRoleInfo(userInfo:proto.UserInfo):void{
		this.infoGroup.visible = true;
		this.leaveLabel.visible = false;
		this.userId = userInfo.userId;
		// this.playerIcon.source = dataObj.icon;
		this.playerName.text = userInfo.nick;
		this.playerCardNum.text = userInfo.cardCount+"";
	}
	public showLeave():void{
		this.infoGroup.visible = false;
		this.leaveLabel.visible = true;
	}
}