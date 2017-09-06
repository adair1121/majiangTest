module proto{	export class c_LoginAccount extends proto.Pro{		public constructor(){			super();			this.S=MessageType.c_LoginAccount;		}		//required>string		public userName:string;//用户名		//required>string		public password:string;//密码		public init(_userName:string,_password:string):c_LoginAccount{			this.userName=_userName;			this.password=_password;			return this;		}public encode(by:egret.ByteArray):void{by.writeUTF(this.userName);by.writeUTF(this.password);	}public decode(by:egret.ByteArray ):void{this.userName=by.readUTF();this.password=by.readUTF();	}	}	export class s_LoginAccount extends proto.Pro{		public constructor(){			super();			this.S=MessageType.s_LoginAccount;		}		//required>bool		public isSuccess:boolean;//是否成功		//optional>string		public errMsg:string;//错误信息		//optional>UserInfo		public userInfo:UserInfo;//用户信息		public init(_isSuccess:boolean,_errMsg:string,_userInfo:UserInfo):s_LoginAccount{			this.isSuccess=_isSuccess;			this.errMsg=_errMsg;			this.userInfo=_userInfo;			return this;		}public encode(by:egret.ByteArray):void{by.writeBoolean(this.isSuccess);if (this.errMsg!= null){by.writeByte(1);by.writeUTF(this.errMsg);}else{	by.writeByte(0);}if (this.userInfo!= null){by.writeByte(1);this.userInfo.encode(by);}else{	by.writeByte(0);}	}public decode(by:egret.ByteArray ):void{this.isSuccess=by.readBoolean();if (by.readByte() > 0) {this.errMsg=by.readUTF();}if (by.readByte() > 0) {this.userInfo=new UserInfo();this.userInfo.decode(by);}	}	}	export class UserInfo extends proto.Pro{		public constructor(){			super();			this.S=MessageType.UserInfo;		}		//required>int		public userId:number=0;//用户唯一编号		//required>string		public nick:string;//昵称		//required>int		public cardCount:number=0;//房卡数量		public init(_userId:number,_nick:string,_cardCount:number):UserInfo{			this.userId=_userId;			this.nick=_nick;			this.cardCount=_cardCount;			return this;		}public encode(by:egret.ByteArray):void{by.writeInt(this.userId);by.writeUTF(this.nick);by.writeInt(this.cardCount);	}public decode(by:egret.ByteArray ):void{this.userId=by.readInt();this.nick=by.readUTF();this.cardCount=by.readInt();	}	}	export class UserInfoWithSeat extends proto.Pro{		public constructor(){			super();			this.S=MessageType.UserInfoWithSeat;		}		//required>int		public seat:number=0;//坐位		//required>UserInfo		public userInfo:UserInfo;//用户信息		public init(_seat:number,_userInfo:UserInfo):UserInfoWithSeat{			this.seat=_seat;			this.userInfo=_userInfo;			return this;		}public encode(by:egret.ByteArray):void{by.writeInt(this.seat);this.userInfo.encode(by);	}public decode(by:egret.ByteArray ):void{this.seat=by.readInt();this.userInfo=new UserInfo();this.userInfo.decode(by);	}	}	export class c_CreateRoom extends proto.Pro{		public constructor(){			super();			this.S=MessageType.c_CreateRoom;		}		//required>int		public basicScore:number=0;//底分		//required>int		public times:number=0;//打几局		//required>string		public roomPassword:string;//房间密码		//required>int		public playerCount:number=0;//几人房间		public init(_basicScore:number,_times:number,_roomPassword:string,_playerCount:number):c_CreateRoom{			this.basicScore=_basicScore;			this.times=_times;			this.roomPassword=_roomPassword;			this.playerCount=_playerCount;			return this;		}public encode(by:egret.ByteArray):void{by.writeInt(this.basicScore);by.writeInt(this.times);by.writeUTF(this.roomPassword);by.writeInt(this.playerCount);	}public decode(by:egret.ByteArray ):void{this.basicScore=by.readInt();this.times=by.readInt();this.roomPassword=by.readUTF();this.playerCount=by.readInt();	}	}	export class s_CreateRoom extends proto.Pro{		public constructor(){			super();			this.S=MessageType.s_CreateRoom;		}		//required>bool		public isSuccess:boolean;//是否成功		//optional>string		public errMsg:string;//错误信息		//optional>int		public tableId:number=0;//所在牌桌ID		//optional>int		public seat:number=0;//所在坐位		//repeated>UserInfoWithSeat		public userInfoList:UserInfoWithSeat[] ;//已存在的玩家信息		public init(_isSuccess:boolean,_errMsg:string,_tableId:number,_seat:number,_userInfoList:UserInfoWithSeat[]):s_CreateRoom{			this.isSuccess=_isSuccess;			this.errMsg=_errMsg;			this.tableId=_tableId;			this.seat=_seat;			this.userInfoList=_userInfoList;			return this;		}public encode(by:egret.ByteArray):void{by.writeBoolean(this.isSuccess);if (this.errMsg!= null){by.writeByte(1);by.writeUTF(this.errMsg);}else{	by.writeByte(0);}//基础类型不建议用optionalby.writeByte(1);by.writeInt(this.tableId);//基础类型不建议用optionalby.writeByte(1);by.writeInt(this.seat);if (this.userInfoList != null){by.writeShort(this.userInfoList.length);for (var i:number = 0; i < this.userInfoList.length; i++) {			this.userInfoList[i].encode(by);}}else{by.writeShort(0);}	}public decode(by:egret.ByteArray ):void{this.isSuccess=by.readBoolean();if (by.readByte() > 0) {this.errMsg=by.readUTF();}if (by.readByte() > 0) {this.tableId=by.readInt();}if (by.readByte() > 0) {this.seat=by.readInt();}var __count4:number = by.readShort();		this.userInfoList = [];for (var i:number = 0; i < __count4; i++) {			this.userInfoList[i] = new UserInfoWithSeat();			this.userInfoList[i].decode(by);}	}	}	export class s_Kickout extends proto.Pro{		public constructor(){			super();			this.S=MessageType.s_Kickout;		}		//required>string		public reason:string;//踢出原因		public init(_reason:string):s_Kickout{			this.reason=_reason;			return this;		}public encode(by:egret.ByteArray):void{by.writeUTF(this.reason);	}public decode(by:egret.ByteArray ):void{this.reason=by.readUTF();	}	}	export class IntList extends proto.Pro{		public constructor(){			super();			this.S=MessageType.IntList;		}		//repeated>int		public list:number[] ;//整形列表		public init(_list:number[]):IntList{			this.list=_list;			return this;		}public encode(by:egret.ByteArray):void{if (this.list != null){by.writeShort(this.list.length);for (var i:number = 0; i < this.list.length; i++) {by.writeInt(this.list[i]);}}else{by.writeShort(0);}	}public decode(by:egret.ByteArray ):void{var __count0:number = by.readShort();		this.list = [];for (var i:number = 0; i < __count0; i++) {this.list[i]=by.readInt();}	}	}	export class SeatCardInfo extends proto.Pro{		public constructor(){			super();			this.S=MessageType.SeatCardInfo;		}		//required>int		public seat:number=0;//所在坐位		//repeated>IntList		public PongKongChow:IntList[] ;//碰杠吃过的牌		//repeated>int		public playCards:number[] ;//打过的牌		public init(_seat:number,_PongKongChow:IntList[],_playCards:number[]):SeatCardInfo{			this.seat=_seat;			this.PongKongChow=_PongKongChow;			this.playCards=_playCards;			return this;		}public encode(by:egret.ByteArray):void{by.writeInt(this.seat);if (this.PongKongChow != null){by.writeShort(this.PongKongChow.length);for (var i:number = 0; i < this.PongKongChow.length; i++) {			this.PongKongChow[i].encode(by);}}else{by.writeShort(0);}if (this.playCards != null){by.writeShort(this.playCards.length);for (var i:number = 0; i < this.playCards.length; i++) {by.writeInt(this.playCards[i]);}}else{by.writeShort(0);}	}public decode(by:egret.ByteArray ):void{this.seat=by.readInt();var __count1:number = by.readShort();		this.PongKongChow = [];for (var i:number = 0; i < __count1; i++) {			this.PongKongChow[i] = new IntList();			this.PongKongChow[i].decode(by);}var __count2:number = by.readShort();		this.playCards = [];for (var i:number = 0; i < __count2; i++) {this.playCards[i]=by.readInt();}	}	}	export class c_EnterRoom extends proto.Pro{		public constructor(){			super();			this.S=MessageType.c_EnterRoom;		}		//required>int		public tableId:number=0;//牌桌ID		//required>string		public roomPassword:string;//房间密码		public init(_tableId:number,_roomPassword:string):c_EnterRoom{			this.tableId=_tableId;			this.roomPassword=_roomPassword;			return this;		}public encode(by:egret.ByteArray):void{by.writeInt(this.tableId);by.writeUTF(this.roomPassword);	}public decode(by:egret.ByteArray ):void{this.tableId=by.readInt();this.roomPassword=by.readUTF();	}	}	export class s_EnterRoom extends proto.Pro{		public constructor(){			super();			this.S=MessageType.s_EnterRoom;		}		//required>bool		public isSuccess:boolean;//是否成功		//optional>string		public errMsg:string;//错误信息		//optional>int		public seat:number=0;//所在坐位		//optional>int		public playerCount:number=0;//所创房间人数		//optional>int		public Dice1:number=0;//股子1		//optional>int		public Dice2:number=0;//股子2		//optional>int		public drawCard:number=0;//摸的那张牌		//repeated>int		public HandsCard:number[] ;//手牌		//repeated>SeatCardInfo		public seatCardInfoList:SeatCardInfo[] ;//坐位上出过的和吃碰杠过的牌		//repeated>UserInfoWithSeat		public userInfoList:UserInfoWithSeat[] ;//已存在玩家的信息		public init(_isSuccess:boolean,_errMsg:string,_seat:number,_playerCount:number,_Dice1:number,_Dice2:number,_drawCard:number,_HandsCard:number[],_seatCardInfoList:SeatCardInfo[],_userInfoList:UserInfoWithSeat[]):s_EnterRoom{			this.isSuccess=_isSuccess;			this.errMsg=_errMsg;			this.seat=_seat;			this.playerCount=_playerCount;			this.Dice1=_Dice1;			this.Dice2=_Dice2;			this.drawCard=_drawCard;			this.HandsCard=_HandsCard;			this.seatCardInfoList=_seatCardInfoList;			this.userInfoList=_userInfoList;			return this;		}public encode(by:egret.ByteArray):void{by.writeBoolean(this.isSuccess);if (this.errMsg!= null){by.writeByte(1);by.writeUTF(this.errMsg);}else{	by.writeByte(0);}//基础类型不建议用optionalby.writeByte(1);by.writeInt(this.seat);//基础类型不建议用optionalby.writeByte(1);by.writeInt(this.playerCount);//基础类型不建议用optionalby.writeByte(1);by.writeInt(this.Dice1);//基础类型不建议用optionalby.writeByte(1);by.writeInt(this.Dice2);//基础类型不建议用optionalby.writeByte(1);by.writeInt(this.drawCard);if (this.HandsCard != null){by.writeShort(this.HandsCard.length);for (var i:number = 0; i < this.HandsCard.length; i++) {by.writeInt(this.HandsCard[i]);}}else{by.writeShort(0);}if (this.seatCardInfoList != null){by.writeShort(this.seatCardInfoList.length);for (var i:number = 0; i < this.seatCardInfoList.length; i++) {			this.seatCardInfoList[i].encode(by);}}else{by.writeShort(0);}if (this.userInfoList != null){by.writeShort(this.userInfoList.length);for (var i:number = 0; i < this.userInfoList.length; i++) {			this.userInfoList[i].encode(by);}}else{by.writeShort(0);}	}public decode(by:egret.ByteArray ):void{this.isSuccess=by.readBoolean();if (by.readByte() > 0) {this.errMsg=by.readUTF();}if (by.readByte() > 0) {this.seat=by.readInt();}if (by.readByte() > 0) {this.playerCount=by.readInt();}if (by.readByte() > 0) {this.Dice1=by.readInt();}if (by.readByte() > 0) {this.Dice2=by.readInt();}if (by.readByte() > 0) {this.drawCard=by.readInt();}var __count7:number = by.readShort();		this.HandsCard = [];for (var i:number = 0; i < __count7; i++) {this.HandsCard[i]=by.readInt();}var __count8:number = by.readShort();		this.seatCardInfoList = [];for (var i:number = 0; i < __count8; i++) {			this.seatCardInfoList[i] = new SeatCardInfo();			this.seatCardInfoList[i].decode(by);}var __count9:number = by.readShort();		this.userInfoList = [];for (var i:number = 0; i < __count9; i++) {			this.userInfoList[i] = new UserInfoWithSeat();			this.userInfoList[i].decode(by);}	}	}}