class ViewGame extends BaseEuiView{
	public northList:eui.List;
	public southList:eui.List;
	public eastList:eui.List;
	public westList:eui.List;
	public promptGroup:eui.Group;
	public roleInfo_104:PlayerRoleInfo;
	public roleInfo_103:PlayerRoleInfo;
	public roleInfo_102:PlayerRoleInfo;
	public roleInfo_101:PlayerRoleInfo;
	public out_101_group:eui.Group;
	public out_102_group:eui.Group;
	public out_103_group:eui.Group;
	public out_104_group:eui.Group;
	public leftHand:eui.Image;
	public topHand:eui.Image;
	public bottomHand:eui.Image;
	public rightHand:eui.Image;
	public readyBtn:eui.Image;
	public buttonYaoQing:eui.Image;
	public tableId:eui.Label;
	public gameNum:eui.Label;
	public timeCom:TimeComponent;
	public rightOper:eui.Group;
	public leftOper:eui.Group;
	public pi:CardItem;
	public lai:CardItem;
	private northCollect:eui.ArrayCollection;
	private southCollect:eui.ArrayCollection;
	private eastCollect:eui.ArrayCollection;
	private westCollect:eui.ArrayCollection;
	private cardSprite:egret.Sprite;
	private cardData:any[] = [];
	private curTarget:HandCardItem;
	private prevTarget:HandCardItem;
	private timer:egret.Timer;
	private curStageY:number;
	private clickState:boolean = false;
	private newCard:HandCardItem;
	//初始化拿牌  一组多少个
	private cardGroupNum:number = 4;
	//初始化每个人间隔拿牌时间 毫秒单位
	private getCardGroupTime:number = 1000;
	/**移动步长 */
	private moveStep:number = 100;
	public leftGroup:eui.Group;
	public rightGroup:eui.Group;
	public topGroup:eui.Group;
	public bottomGroup:eui.Group;
	private TYPE_WAIT:string = "wait";
	private TYPE_GAME:string = "game";
	//当前游戏状态 0为当局结束 1为开始
	private curGameState:number = 0;
	private seatObj:any = {};
	//资源集合
	private assetObj:any = {};
	//打出牌集合
	private dachuObj:any = {};
	//记录相对位置
	private relativeSeat:any ={};
	//我的位置
	private ownerSeat:number;
	//码牌实例类
	private cardMap:CardMap
	//初始化方位--玩家进入房间的方位顺序
	private initSeat:number[] = [data.Seat.South,data.Seat.North,data.Seat.West,data.Seat.East];
	//初始化牌集合
	private cardobj:number[] = [];
	//当前手牌
	private curCardGather:number[] = [];
	//当前出牌位置
	private curFocusSeat:number;
	//上一个出牌组
	private curOutGroup:eui.ArrayCollection;
	//当前用户是否存在痞子赖子碰等操作
	private ifExitOper:boolean = false;
	private initialized:boolean = true;
	private curOption:number = -1;//默认值为-1 普通摸牌
	public constructor($controller:BaseController,$parent:egret.DisplayObjectContainer) {
		super($controller,$parent);
		this.skinName = "ViewGameSkin";
	}
	/**
	 * 对面板进行初始化
	 */
	public initUI():void{
		super.initUI();
		this.northCollect = new eui.ArrayCollection();
		this.southCollect = new eui.ArrayCollection();
		this.westCollect = new eui.ArrayCollection();
		this.eastCollect = new eui.ArrayCollection();
		this.cardSprite = new egret.Sprite();
		this.bottomGroup.addChild(this.cardSprite);
		// this.cardSprite.y = Config.w_height - Config.h_handCard - 10;
		this.northList.itemRenderer = CardItem;
		this.northList.dataProvider = this.northCollect;
		this.southList.itemRenderer = CardItem;
		this.southList.dataProvider = this.southCollect;
		this.westList.itemRenderer = CardItem;
		this.westList.dataProvider = this.westCollect;
		this.eastList.itemRenderer = CardItem;
		this.eastList.dataProvider = this.eastCollect;
		this.seatObj[data.Seat.North] = this.topGroup;
		this.seatObj[data.Seat.East] = this.rightGroup;
		this.seatObj[data.Seat.South] = this.cardSprite;
		this.seatObj[data.Seat.West] = this.leftGroup;
		this.dachuObj[data.Seat.North] = this.northCollect;
		this.dachuObj[data.Seat.East] = this.eastCollect;
		this.dachuObj[data.Seat.West] = this.westCollect;
		this.assetObj[data.Seat.North] = "shoupai_duijia_png";
		this.assetObj[data.Seat.East] = "shoupai_you_png";
		this.assetObj[data.Seat.West] = "shoupai_zuo_png";
		this.timer = new egret.Timer(300,1);
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
		this.cardSprite.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCardItemTap,this);
		this.cardSprite.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onCardTouchBegin,this);
		this.cardSprite.addEventListener(egret.TouchEvent.TOUCH_END,this.doubleTouch,this);
		this.addEventListener(egret.TouchEvent.TOUCH_END,this.onCardTouchEnd,this);
	}
	/**
	 * 对面板数据进行初始化
	 */
	public initData():void{
		super.initData();
		this.northCollect.source = [];
		this.westCollect.source = [];
		this.eastCollect.source = [];
		this.southCollect.source = [];
		this.cardData = [];
		this.curTarget = null;
		this.prevTarget = null;
		this.newCard = null;
		this.clickState = false;
		this.leftHand.visible = false;
		this.rightHand.visible = false;
		this.topHand.visible = false;
		this.bottomHand.visible = false;
		this.cardSprite.removeChildren();
		this.topGroup.removeChildren();
		this.leftGroup.removeChildren();
		this.rightGroup.removeChildren();
		this.leftOper.removeChildren();
		this.rightOper.removeChildren();
		this.out_101_group.removeChildren();
		this.out_102_group.removeChildren();
		this.out_103_group.removeChildren();
		this.out_104_group.removeChildren();
		this.kongCards = [];
		this.curOutCard = {};
		this.readyState = false;
		this.curOperGroup = {};
		this.curOutCardList = [];
		this.curOutGroup = null;
		this.touchNum = 0;
		this.timerStartState = false;
		this.curCardGather = [];
		this.cardSprite.x = 0;
		if(this.cardMap && this.cardMap.parent && this.cardMap.parent.contains(this.cardMap)){
			this.cardMap.parent.removeChild(this.cardMap);
		}
		this.readyBtn.visible = true;
		this.bottomHand.visible = false;
		this.leftHand.visible = false;
		this.rightHand.visible = false;
		this.topHand.visible = false;
		this.initialized = true;
	}
	/**
	 * 面板开启执行函数
	 */
	public open(param:any):void{
		if(param.oper === "createRoom"){
			this.tableId.text = param.tableId;
			this.ownerSeat = param.seat;
			this.skin.currentState = this.TYPE_WAIT;
			var userInfo:proto.UserInfo = DataCenter.userInfo;
			this.roleInfo_102.setRoleInfo(userInfo);
			var index:number = this.initSeat.indexOf(data.Seat.South);
			this.initSeat.splice(index,1);
			this.relativeSeat[param.seat] = data.Seat.South;
			this.curFocusSeat = data.Seat.South;
		}else{
			if(param.handCards.length){
				//掉线后重新进入
				//生成掉线前出牌数据
				this.skin.currentState = this.TYPE_GAME;
			}else{
				//第一次进入房间
				this.skin.currentState = this.TYPE_WAIT;
				this.tableId.text = param.tableId;
				this.ownerSeat = param.seat;
				DataCenter.playerCount = param.playerCount;
				var userInfo:proto.UserInfo = DataCenter.userInfo;
				this.roleInfo_102.setRoleInfo(userInfo);
				var index:number = this.initSeat.indexOf(data.Seat.South);
				this.initSeat.splice(index,1);
				this.relativeSeat[param.seat] = data.Seat.South;
				this.createRoleInfo(param.userInfoList);
			}
		}
	}
	
	/**
	 * 面板关闭执行函数
	 */
	public close(param:any[]):void{

	}
	/**
	 * 创建人物信息
	 */
	public createRoleInfo(userInfoList:proto.UserInfoWithSeat[]):void{
		if(DataCenter.playerCount === 2){
			if(userInfoList.length){
				var userInfoWithSeat:proto.UserInfoWithSeat = userInfoList[0] as proto.UserInfoWithSeat;
				var userInfo:proto.UserInfo = userInfoWithSeat.userInfo;
				this.roleInfo_104.setRoleInfo(userInfo);
				var index:number = this.initSeat.indexOf(data.Seat.North);
				this.initSeat.splice(index,1);
				this.relativeSeat[userInfoWithSeat.seat] = data.Seat.North;
			}
		}else{
			if(userInfoList.length){
				for(var i:number = 0,len:number = userInfoList.length,item:proto.UserInfoWithSeat;i<len;i++){
					item = userInfoList[i];
					var seat:number = this.initSeat.shift();
					// this["roleInfo_"+seat].seat = item.seat;
					this.relativeSeat[item.seat] = seat;
					this["roleInfo_"+seat].setRoleInfo(item.userInfo);
				}
			}
		}
		
	}
	private curCardPi:number;
	private curCardLai:number;
	private dice1:number;
	private dice2:number;
	private dealer:number;
	/**
	 * 初始化手牌
	 */
	public showGameState(msg:proto.s_NotifyHandCards):void{
		this.skin.currentState = this.TYPE_GAME;
		this.cardobj = this.cardobj.concat(msg.handCards);
		this.curCardPi = msg.pizi;
		this.curCardLai = msg.laizi;
		var piTemple:data.CardConfigTemple = temple.TempleManager.select(msg.pizi) as data.CardConfigTemple;
		var laiTemple:data.CardConfigTemple = temple.TempleManager.select(msg.laizi) as data.CardConfigTemple;
		if(!!piTemple){
			this.pi.icon = piTemple.icon;
			this.pi.setOperLabel(this.curCardPi,this.curCardPi,this.curCardLai);
		}
		if(!!laiTemple){
			this.lai.icon = laiTemple.icon;
			this.lai.setOperLabel(this.curCardLai,this.curCardPi,this.curCardLai);
		}
		this.dice1 = msg.dice1;
		this.dice2 = msg.dice2;
		this.dealer = msg.dealer;
		this.curCardGather = this.curCardGather.concat(msg.handCards);
	}
	/**处理摸牌 */
	private kongCards:proto.IntList[] = [];
	public notifyDealCards(msg:proto.s_NotifyDealCard):void{
		this.kongCards = [];
		if(this.relativeSeat[msg.seat] === data.Seat.South){
			//如果相对座位为南是 添加手牌到显示组 -- 当前玩家摸牌
			// this.addCardGroup([msg.drawCard],true);
			if(this.initialized){
				this.curCardGather.push(msg.drawCard);
				this.startNewGame(this.dice1,this.dice2,this.relativeSeat[this.dealer]);
			}else{
				// if(DataCenter.playerCount === 1){
					//测试当前为1个玩家是 打牌后立即摸牌 设置newCard会影响后面设置位置 要延迟
					var timeOut = egret.setTimeout(()=>{
						if(this.curOption === -1){
							this.cardMap.removeItem();
						}else{
							this.cardMap.removeItem(true);
						}
						this.addCardGroup([msg.drawCard],true);
						egret.clearTimeout(timeOut);
					},this,300);
				// }else{
				// 	if(this.curOption === -1){
				// 		this.cardMap.removeItem();
				// 	}else{
				// 		this.cardMap.removeItem(true);
				// 	}
				// 	this.addCardGroup([msg.drawCard],true);
				// }
				
			}
			//此处响应玩家摸牌 收到可操作牌组
			this.ifExitOper = this.judgeOper(msg.KongCards,0);
			this.kongCards = this.kongCards.concat(msg.KongCards);
			//测试输出
			for(var i:number = 0;i<msg.KongCards.length;i++){
				console.log("=====>此处为收到的操作组=====》"+msg.KongCards[i].list)
			}
		}else{
			if(this.initialized){
				this.startNewGame(this.dice1,this.dice2,this.relativeSeat[this.dealer]);
			}else{
				//其他玩家摸牌显示0
				var seat:number = this.relativeSeat[msg.seat];
				var curGroup:eui.Group = this.seatObj[seat];
				var img:eui.Image = new eui.Image();
				img.source = this.assetObj[seat];
				curGroup.addChild(img);
				if(seat === data.Seat.North){
					img.x = curGroup.numChildren * img.width;
					curGroup.x -= img.width;
				}else{
					img.y = curGroup.numChildren * img.width;
					curGroup.y -= img.width;
				}
				if(this.curOption === -1){
					this.cardMap.removeItem();
				}else{
					this.cardMap.removeItem(true);
				}
			}
		}
		if(msg.isWin){
			this.winOper();
		}
	}
	//胜利后的操作
	private winOper():void{
		//此处为测试使用
		var timeOut = egret.setTimeout(()=>{
			alert("win")
			egret.clearTimeout(timeOut);
			this.skin.currentState = this.TYPE_WAIT;
			this.initData();
		},this,2000);
	}
	private curOutCard:any = {};
	/**通知其他人打牌信息 */
	public notifyPlayCard(msg:proto.s_NotifyPlayCard):void{
		if(this.relativeSeat[msg.seat] === data.Seat.South){
			//此处响应玩家打牌 收到可操作牌组
			return;
		}
		var cardTemple:data.CardConfigTemple = temple.TempleManager.select(msg.playCard) as data.CardConfigTemple;
		var cardBg:number = 0;
		this.curOutCard.card = msg.playCard;
		this.curOutCard.seat = this.relativeSeat[msg.seat];
		if(this.curOutCard.seat === data.Seat.East || this.curOutCard.seat === data.Seat.West){
			cardBg = 1;
		}else{
			cardBg = 0;
		}
		var item:any = {cardBg:cardBg,icon:cardTemple.icon + "_png",id:cardTemple.id}
		if(this.curOutCard.seat != data.Seat.South){
			this.curOutGroup = this.dachuObj[this.relativeSeat[msg.seat]];
			this.addCardItem(this.dachuObj[this.relativeSeat[msg.seat]],item);
		}
		var curGroup:eui.Group = this.seatObj[this.curOutCard.seat];
		curGroup.removeChildAt(curGroup.numChildren-1);
		if(this.curOutCard.seat === data.Seat.North){
			curGroup.x -= Config.w_tieldCard;
		}else{
			curGroup.y -= Config.w_tieldCard;
		}
		// //此处响应玩家打牌 收到可操作牌组
		this.ifExitOper = this.judgeOper(msg.pongKongChow,1);
		// if(!this.ifExitOper){
		// 	//过
		// 	this.applyFunc(GameConsts.PLAYCARDRESPONSE_C2S,{option:data.Option.Pass});
		// }
		if(msg.isWin){
			//胡牌
			this.winOper();
		}
	}
	private curOperType:number = 0; // 响应类型 0:响应摸牌 1:响应别人出牌
	/**判断是否含有操作 */
	private judgeOper(oper:proto.IntList[],type:number):boolean{
		this.curOperType = type;
		//待确定修改
		var operGather:number[] = [];
		var curOper:number;
		this.curOperGroup = {};
		for(var i:number = 0;i<oper.length;i++){
			if(oper[i].list.length >= 4 && oper[i].list[0] != this.curCardLai && oper[i].list[0] != this.curCardPi){
				//杠
				curOper = data.Option.Kong;
			}else if(oper[i].list.length >=3 && oper[i].list[0] != this.curCardLai && oper[i].list[0] != this.curCardPi){
				//碰或吃
				if(oper[i].list[0] == oper[i].list[1]){
					//碰
					curOper = data.Option.Pong;
				}else{
					//吃
					curOper = data.Option.Chow;
				}
			}else{
				//痞子癞子
				for(var j:number = 0;j<oper[i].list.length;j++){
					var value:number = oper[i].list[j];
					if(value === this.curCardPi){
						curOper = data.Option.Pi;
					}else if(value === this.curCardLai){
						curOper = data.Option.Lai;
					}
				}
			}
			if(operGather.indexOf(curOper) === -1){
				operGather.push(curOper);
			}
			if(!this.curOperGroup[curOper]){
				this.curOperGroup[curOper] = [];
			}
			this.curOperGroup[curOper].push(oper[i]);
		}
		if(operGather.length){
			// operGather.push(data.Option.Pass);
			this.createOper(operGather);
			return true;
		}
		return false;
	}
	/**
	 * 打牌响应 等待其他玩家响应
	 */
	public notifyPlayResponse(msg:proto.s_NotifyPlayResponse):void{
		if(msg.pongKongChow.length){
			this.curFocusSeat = this.relativeSeat[msg.seat];
			var type:number = -1;
			var kongCard:number = -1;
			if(msg.pongKongChow.length && msg.option != data.Option.Lai && msg.option != data.Option.Pi ){
				if(msg.option === data.Option.Kong){
					type = msg.pongKongChow.pop();
					if(type === 1){
						//暗杠//自摸的杠
					}else{
						//明杠 杠别人的
						var source:any[] = this.curOutGroup.source;
						kongCard = source[source.length-1].id;
						this.curOutGroup.removeItemAt(source.length-1);
					}
				}else{
					var source:any[] = this.curOutGroup.source;
					kongCard = source[source.length-1].id;
					this.curOutGroup.removeItemAt(source.length-1);
				}
				
			}
			this.operShow(this.relativeSeat[msg.seat],msg.pongKongChow,type,kongCard);
		}
		// if(this.relativeSeat[msg.seat] === data.Seat.South){
		// 	//如果收到的是当前打牌用户 返回
		// 	return;
		// }
		// if(!msg.pongKongChow.length){
		// 	//过
		// 	this.applyFunc(GameConsts.PLAYCARDRESPONSE_C2S,{option:data.Option.Pass});
		// }else{
		// 	this.curFocusSeat = this.relativeSeat[msg.seat];
		// 	//提示对应操作
		// 	// this.createOper([msg.option]);
		// }

	}
	/**
	 * 切换用户
	 */
	public notifyChangeUser(seat:number):void{
		if(!this.initialized){
			this.timeCom.initialize();
			this.curFocusSeat = this.relativeSeat[seat];
			this.timeCom.setFocus(this.curFocusSeat,Config.waitTime,this.timeEnd,this);
		}
	}
	/**
	 * 响应别人打出牌自己的吃碰杠等操作完成后
	 */
	public playCardResponse():void{
		this.leftOper.removeChildren();
		this.rightOper.removeChildren();
		this.promptGroup.removeChildren();
		this.ifExitOper = false;
		this.newCard = null;
		console.log(this.curOutGroup)
		// this.operShow(this.curFocusSeat,this.curOutCardList);
	}
	/**
	 * 摸牌响应操作
	 */
	public drawCardResponseRes():void{
		this.leftOper.removeChildren();
		this.rightOper.removeChildren();
		this.promptGroup.removeChildren();
		this.ifExitOper = this.judgeOper(this.kongCards,0);
		// this.operShow(data.Seat.South,this.curOutCardList);
	}
	/**
	 * 响应操作后 吃碰杠显示
	 */
	private operShow(seat:number,operList:number[],kongType?:number,kongCard?:number):void{
		if(operList.length){
			var curGroup:eui.Group = this["out_"+seat+"_group"];
			var handGroup:eui.Group = this.seatObj[seat];
			var group:eui.Group = new eui.Group();
			operList.forEach((cardNum:number,index:number)=>{
				var cardItem:any;
				if(kongType === 1){
					//暗杠
					cardItem = new eui.Image();
					cardItem.source = "opposite_block_back_29_png";
				}else{
					cardItem = new CardItem();
					var cardTemple:data.CardConfigTemple = temple.TempleManager.select(cardNum) as data.CardConfigTemple;
					cardItem.icon = cardTemple.icon;
					cardItem.setOperLabel(cardTemple.id,this.curCardPi,this.curCardLai);
				}
				group.addChild(cardItem);
				if(seat === data.Seat.South){
					cardItem.scaleX = cardItem.scaleY = 1.3;
					cardItem.x = index*36*1.3;
				}else{
					cardItem.x = index*36;
				}
				if(seat === data.Seat.South){
					for(var i:number = this.cardSprite.numChildren-1;i>=0;i--){
						var item:HandCardItem = this.cardSprite.getChildAt(i) as HandCardItem;
						if(kongCard != -1 && item.cardIdNum === kongCard){
							//当前显示组合中 碰吃别人的牌中 自己的手牌也存在时 不移除
							continue;
						}
						if(item.cardIdNum == cardNum){
							this.cardSprite.removeChild(item);
							break;
						}
					}
				}
			},this);
			curGroup.addChild(group);
			group.x = curGroup.width;
			curGroup.width += group.width;
			if(seat === data.Seat.South){
				this.sortHandCards(this.cardSprite);
			}
			if(seat === data.Seat.South){
				var stagePos:egret.Point = this.cardSprite.localToGlobal(this.cardSprite.getChildAt(0).x,this.cardSprite.getChildAt(0).y);
				if((curGroup.x + curGroup.width) > stagePos.x){
					this.cardSprite.x += Math.abs(stagePos.x - (curGroup.x + curGroup.width));
				}
			}
		}
	}
	/**
	 * 重新排序手牌
	 */
	private sortHandCards(cardSprite:egret.Sprite):void{
		var arr:number[] = [];
		for(var i:number = 0;i<cardSprite.numChildren;i++){
			var card1:HandCardItem = cardSprite.getChildAt(i) as HandCardItem;
			arr.push(card1.cardIdNum);
		}
		var arr2:number[] = GlobalFunc.sortRule(GlobalFunc.NORMALIZE,"",arr);
		this.cardSprite.removeChildren();
		this.addCardGroup(arr2);
	}
	/**
	 * 离开房间
	 */
	public leaveSeat(seat:number):void{
		if(DataCenter.playerCount === 2){
			this.roleInfo_104.showLeave();
		}else{
			this["roleInfo_"+this.relativeSeat[seat]].showLeave();
		}
	}
	/**出牌成功 */
	public playCardSuccess():void{
		this.curOption = -1;
		this.outCard(data.Seat.South);
	}
	/**
	 * 当前局数结束
	 */
	public curGameEnd(msg:proto.s_NotifyEndHandCards):void{
		this.curGameState = 0;
	}
	/**举手成功 */
	public raiseHandSuccess():void{
		this.readyBtn.visible = false;
		this.bottomHand.visible = true;
	}
	/**
	 * 开始新的一局
	 */
	private startNewGame(num1:number,num2:number,seat:number):void{
		if(this.cardMap && this.cardMap.parent && this.cardMap.parent.contains(this.cardMap)){
			this.cardMap.parent.removeChild(this.cardMap);
		}
		this.curFocusSeat = seat;
		this.cardMap = new CardMap();
		this.curGameState = 1;
		this.addChild(this.cardMap);
		this.setChildIndex(this.cardMap,1);
		this.cardMap.width = Config.w_width;
		this.cardMap.height = Config.w_height;
		this.cardMap.x = this.cardMap.y = 0;
		this.cardMap.calculBlock(num1,num2,seat);
		CardTransFormUtil.startGetCard(seat,this.cardobj,this.cardSprite,(dataObj)=>{
			if(dataObj.final){
				//切牌发牌完毕
				this.initialized = false;
				this.cardSprite.removeChildren();
				var curCardNum:number;
				if(seat === data.Seat.South){
					curCardNum = this.curCardGather.pop();
				}
				var arr:number[] = GlobalFunc.sortRule(GlobalFunc.NORMALIZE,"",this.curCardGather);
				this.addCardGroup(arr);
				if(!isNaN(curCardNum)){
					var cardTemple:data.CardConfigTemple = temple.TempleManager.select(curCardNum) as data.CardConfigTemple;
					var card:HandCardItem = new HandCardItem(cardTemple);
					this.newCard = card;
					this.addCardGroup([curCardNum],true);
					this.curCardGather.push(curCardNum);
				}
				this.timeCom.initialize();
				this.timeCom.setFocus(this.curFocusSeat,Config.waitTime,this.timeEnd,this);
			}else{
				if(dataObj.handCard.length){
					//当前为自己的手牌显示
					this.addCardGroup(dataObj.handCard);
					if(dataObj.handCard.length >= 4){
						this.cardMap.removeBlock();
					}
					if(dataObj.handCard.length === 2){
						this.cardMap.removeJumpItem();
					}
					if(dataObj.handCard.length === 1){
						if(this.ownerSeat === this.dealer){
							this.cardMap.removeJumpItem();
						}else{
							this.cardMap.removeItem();
						}
					}
				}else{
					//当前为别的玩家手牌显示
					for(var i:number = 0;i<dataObj.num;i++){
						var img:eui.Image = new eui.Image();
						img.source = this.assetObj[dataObj.seat];
						this.seatObj[dataObj.seat].addChild(img);
						if(dataObj.seat === data.Seat.North){
							img.x = this.seatObj[dataObj.seat].numChildren * 39;
						}else{
							img.y = this.seatObj[dataObj.seat].numChildren * 26;
						}
					}
					if(dataObj.num === 4){
						//当前单次获得卡牌数为4张
						this.cardMap.removeBlock();
					}
					if(dataObj.num === 2){
						//跳牌
						this.cardMap.removeJumpItem();
					}
					if(dataObj.num === 1){
						this.cardMap.removeItem();
					}
				}
			}
		},this)
	}
	/**
	 * 当前出牌时间结束
	 */
	private timeEnd():void{
		// if(this.curFocusSeat === data.Seat.South){
		// 	var lastCard:HandCardItem = this.cardSprite.getChildAt(this.cardSprite.numChildren - 1) as HandCardItem;
		// 	this.newCard = this.curTarget = lastCard;
		// 	var card:number = CardTransFormUtil.trasnFormCardIdWay2(Number(this.curTarget.cardId));
		// 	this.applyFunc(GameConsts.PLAYCARD_C2S,card);
		// }
	}
	/**添加打出卡牌 */
	private addCardItem(collect:eui.ArrayCollection,item:any):void{
		collect.addItem(item);
	}
	/**移除打出卡牌 */
	private removeCardItem(collect:eui.ArrayCollection,item:any):void{
		collect.removeItemAt(collect.source[collect.source.length - 1]);
	}
	/**添加卡牌组 包含摸牌 */
	private addCardGroup(cardGroup:number[],ifAddCard:boolean = false):void{
		for(var i:number = 0,len = cardGroup.length;i<len;i++){
			// var cardTempleId:number = CardTransFormUtil.trasnFormCardIdWay2(cardGroup[i]);
			var cardTemple:data.CardConfigTemple = temple.TempleManager.select(cardGroup[i]) as data.CardConfigTemple;
			var card:HandCardItem = new HandCardItem(cardTemple);
			card.setOperLabel(cardGroup[i],this.curCardPi,this.curCardLai);
			if(!ifAddCard){
				card.x = (card.width*0.8)*this.cardSprite.numChildren;
			}else{
				card.x = this.cardSprite.numChildren * (card.width*0.8) + card.width*0.8;
				this.newCard = card;
			}
			this.cardSprite.addChild(card);
		}
	}
	/**卡牌单项点击 */
	private onCardItemTap(evt:egret.TouchEvent):void{
		this.curTarget = evt.target.parent as HandCardItem;
		if(this.prevTarget){
			if(this.curTarget === this.prevTarget){
				egret.Tween.get(this.curTarget).to({y:0},100).call(function(){
					egret.Tween.removeTweens(this.curTarget);
					this.prevTarget = null;
				},this);
			}else{
				egret.Tween.get(this.curTarget).to({y:this.curTarget.y-(this.curTarget.height>>2)},100).call(function(){
					egret.Tween.removeTweens(this.curTarget)
				},this);
				egret.Tween.get(this.prevTarget).to({y:0},100).call(function(){
					egret.Tween.removeTweens(this.prevTarget);
				},this);
			}
		}else{
			egret.Tween.get(this.curTarget).to({y:this.curTarget.y-(this.curTarget.height>>2)},100).call(function(){
				egret.Tween.removeTweens(this.curTarget)
			},this);
		}
		this.prevTarget = evt.target.parent as HandCardItem;
	}
	private onCardTouchBegin(evt:egret.TouchEvent):void{
		this.clickState = true;
		this.curStageY = evt.stageY;
		this.curTarget = evt.target.parent as HandCardItem;
	}
	private onTimer(evt:egret.TimerEvent):void{
		if(this.touchNum >= 2){
			//doubleclick
			if(this.curFocusSeat === data.Seat.South && this.skin.currentState === this.TYPE_GAME && !this.ifExitOper){
				//==此处需要与服务器进行交互===
				var card:number = CardTransFormUtil.trasnFormCardIdWay2(Number(this.curTarget.cardId))
				console.log("============当前打的牌是-----====》："+this.curTarget.cardId);
				this.applyFunc(GameConsts.PLAYCARD_C2S,card);
			}
		}
		this.touchNum = 0;
		this.timerStartState = false;
	}
	private touchNum:number = 0;
	private timerStartState:boolean = false;
	private doubleTouch(evt:egret.TouchEvent):void{
		if(evt.target.parent === this.curTarget){
			//点击的同一张牌
			this.touchNum+=1;
			if(!this.timerStartState){
				this.timer.start();
			}
			this.timerStartState = true;
		}
	}
	private onCardTouchEnd(evt:egret.TouchEvent):void{
		if(this.clickState && this.curFocusSeat === data.Seat.South && this.skin.currentState === this.TYPE_GAME && !this.ifExitOper){
			this.clickState = false;
			var interVal:number = this.curStageY - evt.stageY;
			if(interVal > Config.h_handCard){
				//==此处需要与服务器进行交互===
				var card:number = CardTransFormUtil.trasnFormCardIdWay2(Number(this.curTarget.cardId))
				console.log("============当前打的牌是-----====》："+this.curTarget.cardId);
				this.applyFunc(GameConsts.PLAYCARD_C2S,card);
			}
		}
	}
	/**查询当前牌 */
	private searchHandCard(cardId:number):number{
		return this.curCardGather.indexOf(cardId);
	}
	/**出牌 */
	private outCard(seat:number,iconId?:string,ifGroup?:boolean):void{
		if(seat === data.Seat.South){
			var obj:any = {icon:this.curTarget.path_icon,id:this.curTarget.cardIdNum};
			//将打出的牌移除当前手牌
			this.curCardGather.splice(this.searchHandCard(parseInt(this.curTarget.cardId)),1);
			//打出牌添加数据源
			this.addCardItem(this.southCollect,obj);
			//当前打出牌组
			this.curOutGroup = this.southCollect;
			//移除手牌item
			var curX:number = this.curTarget.x;
			this.cardSprite.removeChild(this.curTarget);
			if(!!this.newCard){
				if(this.curTarget != this.newCard){
					this.setCardToPosition(curX);
				}
			}else{
				//当前吃碰杠操作后的出牌
				var moveGather:HandCardItem[] = [];
				for(var m:number = 0;m<this.cardSprite.numChildren;m++){
					var hitem:HandCardItem = this.cardSprite.getChildAt(m) as HandCardItem;
					if(hitem.x >= this.curTarget.x-3){
						moveGather.push(hitem);
					}
				}
				for(var n:number = 0;n<moveGather.length;n++){
					var hitem2:HandCardItem = moveGather[n];
					egret.Tween.get(hitem2).to({x:(hitem2.x+(-1*hitem2.width*0.8))},this.moveStep).call(()=>{
						egret.Tween.removeTweens(hitem2);
					},this)
				}
			}
		}else{
			// var mx:number = 0;
			// var my:number = 0;
			// var moveStepObj:any = {};
			// var cardBg:number = 0;
			// if(seat === data.Seat.East || seat === data.Seat.West){
			// 	my = 1;mx = 0;cardBg = 1;
			// }else{
			// 	mx = 1;my = 0;cardBg = 0;
			// }
			// //其他玩家打出手牌
			// var index:number = (Math.random()*12+1)>>0;
			// this.addCardItem(this.dachuObj[seat],{cardBg:cardBg,icon:iconId + "_png"});
			// this.curOutGroup = this.dachuObj[seat];
			// var len:number = this.seatObj[seat].numChildren;
			// var arr:any[] = [];
			// for(var i:number = 0;i<len;i++){
			// 	if(i>index){
			// 		arr.push(this.seatObj[seat].getChildAt(i));
			// 	}
			// }
			// this.seatObj[seat].removeChildAt(index);
			// for(var j:number = 0;j<arr.length;j++){
			// 	var item:eui.Image = arr[j];
			// 	if(mx){
			// 		moveStepObj = {x:item.x - item.width};
			// 	}
			// 	if(my){
			// 		moveStepObj = {y:item.y - item.height};
			// 	}
			// 	egret.Tween.get(item).to(moveStepObj,this.moveStep).call(()=>{
			// 		egret.Tween.removeTweens(item);
			// 	},this)
			// }
		}
		
	}
	private lastCard:boolean = false;
	private cardIndex:number = -1;
	/**设置牌位置 */
	private setCardToPosition(curX:number):void{
		this.lastCard = false;
		var len:number = this.cardSprite.numChildren-1;
		var setX:number = -1;
		var curMoveGather:HandCardItem[] = [];
		this.cardIndex = -1;
		for(var i:number = 0,item:HandCardItem;i<len;i++){
			item = this.cardSprite.getChildAt(i) as HandCardItem;
			var cardType:number = CardTransFormUtil.getCardType(item.cardId);
			var newCardType:number = CardTransFormUtil.getCardType(this.newCard.cardId);
			if(newCardType == cardType){
				//找到了同类型的卡牌
				var cardId:number = CardTransFormUtil.trasnFormCardIdWay2(Number(item.cardId));
				var newCardId:number = CardTransFormUtil.trasnFormCardIdWay2(Number(this.newCard.cardId));
				this.cardIndex = i;
				if(newCardId <= cardId){
					//新摸到的牌 在当前卡牌后面
					setX = item.x;
					if(setX > curX){
						setX = item.x - (item.width*0.8);
					}
					this.lastCard = false;
					break;
				}
				this.lastCard = true;
				this.cardIndex += 1;
				if(item.x < curX){
					setX = item.x + (item.width*0.8);
				}else{
					setX = item.x;
				}
			}else{
				continue;
			}
		}
		if(setX != -1){
			this.searchMoveCardGroup(curX,setX);
		}else{
			this.cardIndex = this.cardSprite.numChildren - 1;
			//未找到同类新卡牌
			egret.Tween.get(this.newCard).to({x:this.newCard.x - (this.newCard.width*0.8)},this.moveStep).call(()=>{
				egret.Tween.removeTweens(this.newCard);
				for(var i:number = 0;i<this.cardSprite.numChildren;i++){
					var item:HandCardItem = this.cardSprite.getChildAt(i) as HandCardItem;
					if(item.x >= curX){
						egret.Tween.get(item).to({x:(item.x - (item.width*0.8))},this.moveStep).call(()=>{
							egret.Tween.removeTweens(item);
						},this)
					}
				}
			},this);
			
		}
	}
	/**查询移动卡牌组合 */
	private searchMoveCardGroup(curX:number,setX:number):void{
		var moveGather:HandCardItem[] = [];
		var diction:number = 0;
		if(Math.abs(setX - curX ) > 3){
			//当前新卡牌与打出卡牌不在同一个位置
			if(setX < curX){
				diction = 1;
				//当前设置位置在打出牌位置前面
				for(var i:number = 0;i<this.cardSprite.numChildren;i++){
					var item:HandCardItem = this.cardSprite.getChildAt(i) as HandCardItem;
					if(item.x >= setX-3 && item.x < curX + 3){
						moveGather.push(item);
					}
				}
			}else{
				diction = -1;
				for(var j:number = 0;j<this.cardSprite.numChildren;j++){
					var item:HandCardItem = this.cardSprite.getChildAt(j) as HandCardItem;
					if(item.x <= setX + 3 && item.x > curX - 3){
						moveGather.push(item);
					}
				}
			}
			egret.Tween.get(this.newCard).to({y: - (this.newCard.height*0.8) - 20},this.moveStep)
			.to({x:setX},((this.newCard.x - setX)/(this.newCard.width*0.8))*this.moveStep).call(()=>{
				for(var m:number = 0;m<moveGather.length;m++){
					var item:HandCardItem = moveGather[m];
					egret.Tween.get(item).to({x:(item.x+diction*item.width*0.8)},this.moveStep).call((data)=>{
						egret.Tween.removeTweens(item);
					},this,[{item:item,index:m}])
				}
			},this).to({y:0},this.moveStep).call(()=>{
				this.setCardLayerRelation();
				egret.Tween.removeTweens(this.newCard);
			},this);
			
		}else{
			egret.Tween.get(this.newCard).to({y: - (this.newCard.height*0.8) - 20},this.moveStep)
			.to({x:curX},((this.newCard.x - curX)/(this.newCard.width*0.8))*this.moveStep)
			.to({y:0},this.moveStep).call(()=>{
				this.setCardLayerRelation();
				egret.Tween.removeTweens(this.newCard);
			},this);
		}
	}
	/**设置层级 */
	private setCardLayerRelation():void{
		if(DataCenter.playerCount === 1){
			this.cardSprite.setChildIndex(this.cardSprite.getChildAt(this.cardSprite.numChildren-2),this.cardIndex);
		}else{
			this.cardSprite.setChildIndex(this.cardSprite.getChildAt(this.cardSprite.numChildren-1),this.cardIndex);
		}
	}
	/**生成对应操作 */
	private createOper(option:number[]):void{
		this.leftOper.removeChildren();
		this.rightOper.removeChildren();
		var passImg:eui.Image = new eui.Image();
		passImg.source = "room_oper_"+data.Option.Pass+"_png";
		this.rightOper.addChild(passImg);
		passImg.name = data.Option.Pass+"";
		passImg.width = 63,passImg.height = 78;
		passImg.x = this.rightOper.width - passImg.width;
		for(var i:number = 0,len:number = option.length;i<len;i++){
			var img:eui.Image = new eui.Image();
			img.source = "room_oper_"+option[i]+"_png";
			img.width = 63;
			img.height = 78;
			img.name = option[i]+"";
			if(option[i] === data.Option.Lai || option[i] === data.Option.Pi){
				this.leftOper.addChild(img);
				img.x = i*img.width+10;
			}else{
				this.rightOper.addChild(img);
				img.x = this.rightOper.width - this.rightOper.numChildren*(img.width+10);
			}
		}
	}
	/**显示提示操作牌选项信息-- */
	private promptOperGroup(optionCardList:proto.IntList[]):void{
		this.promptGroup.width = 0;
		for(var i:number = 0;i<optionCardList.length;i++){
			var itemList:number[] = optionCardList[i].list;
			var group:eui.Group = new eui.Group();
			for(var j:number = 0;j<itemList.length;j++){
				var cardItem:CardItem = new CardItem();
				var cardTemple:data.CardConfigTemple = temple.TempleManager.select(itemList[j]) as data.CardConfigTemple;
				cardItem.icon = cardTemple.icon;
				group.addChild(cardItem);
				cardItem.x = j*cardItem.width;
			}
			this.promptGroup.addChild(group);
			this.promptGroup.width += group.width + 10;
			group.x = (group.numChildren * Config.w_tieldCard) * i + 10;
		}
	}
	private readyState:boolean = false;
	//当前可操作的卡牌集合（如点击吃 -- 供选择的卡牌组）形式为{data.Option.Chi:proto.IntList[]}
	private curOperGroup:any = {};
	//当前出牌集合
	private curOutCardList:number[];
	public effectGroup:eui.Group;
	private onTouchHandler(evt:egret.TouchEvent):void{
		var name:string;
		if(evt.target.parent === this.leftOper || evt.target.parent ===this.rightOper){
			name = evt.target.name;
			switch(parseInt(name)){
				case data.Option.Pass:
					//过
					this.curOutCardList = [];
					this.kongCards = [];
					if(this.curOperType){
						//别人出牌
						this.applyFunc(GameConsts.PLAYCARDRESPONSE_C2S,{option:name});
					}else{
						this.applyFunc(GameConsts.DRAWCARDRESPONSE_C2S,{option:name});
					}
					break;
				default:
					var cardList:proto.IntList[] = this.curOperGroup[name];
					if(cardList.length > 1){
						//供用户选择当前操作的出牌集合
						this.curOption = parseInt(name);
						this.promptOperGroup(cardList);
					}else{
						if(parseInt(name) === data.Option.Pi || parseInt(name) === data.Option.Lai || parseInt(name) === data.Option.Kong){
							this.curOption = parseInt(name);
						}
						//当前操作的牌集合只有一张  直接打出
						this.curOutCardList = cardList[0].list;
						if(this.curOperType){
							this.applyFunc(GameConsts.PLAYCARDRESPONSE_C2S,{option:name,cardList:cardList[0].list});
						}else{
							this.applyFunc(GameConsts.DRAWCARDRESPONSE_C2S,{option:name,cardList:cardList[0].list});
						}
					}
					var mc:MovieClip = new MovieClip();
					this.effectGroup.addChild(mc);
					mc.loadFile(Config.movie_path+name,true,1,()=>{
						this.effectGroup.removeChild(mc);
					})
			}
			
			return;
		}
		if(evt.target.parent instanceof CardItem){
			this.curOutCardList = [];
			if(!this.promptGroup.numChildren){
				return;
			}
			var cardArr:number[] = [];
			var group:eui.Group = evt.target.parent.parent;
			for(var i:number = 0;i<group.numChildren;i++){
				var item:CardItem = group.getChildAt(i) as CardItem;
				cardArr.push(item.iconTrans);
			}
			this.curOutCardList = this.curOutCardList.concat(cardArr);
			if(this.curOperType){
				this.applyFunc(GameConsts.PLAYCARDRESPONSE_C2S,{option:this.curOption,cardList:cardArr});
			}else{
				this.applyFunc(GameConsts.DRAWCARDRESPONSE_C2S,{option:this.curOption,cardList:cardArr});
			}
			return;
		}
		switch(evt.target){
			case this.buttonYaoQing:
				//邀请微信好友
				break;
			case this.readyBtn:
				if(this.readyState){
					return;
				}
				this.readyState = true;
				this.applyFunc(GameConsts.RAISEHANDS_C2S);
				break;
		}
	}
}