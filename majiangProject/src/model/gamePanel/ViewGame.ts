class ViewGame extends BaseEuiView{
	public northList:eui.List;
	public southList:eui.List;
	public eastList:eui.List;
	public westList:eui.List;
	public roleInfo_104:PlayerRoleInfo;
	public roleInfo_103:PlayerRoleInfo;
	public roleInfo_102:PlayerRoleInfo;
	public roleInfo_101:PlayerRoleInfo;
	public leftHand:eui.Image;
	public topHand:eui.Image;
	public bottomHand:eui.Image;
	public rightHand:eui.Image;
	public readyBtn:eui.Image;
	public buttonYaoQing:eui.Image;
	public tableId:eui.Label;
	public gameNum:eui.Label;
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
	private TYPE_WAIT:string = "wait";
	private TYPE_GAME:string = "game";
	private curGameState:number = 0;
	private seatObj:any = {};
	private assetObj:any = {};
	private dachuObj:any = {};
	private cardMap:CardMap
	private testCardobj:number[] = [0x24,0x11,0x23,0x12,0x18,0x22,0x19,0x21,0x17,0x18,0x25,0x11,0x21];
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
		this.addChild(this.cardSprite);
		this.cardSprite.y = Config.w_height - Config.h_handCard;
		this.cardSprite.x = Config.w_handCard;
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
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
		this.cardSprite.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCardItemTap,this);
		this.cardSprite.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onCardTouchBegin,this);
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
	}
	/**
	 * 面板开启执行函数
	 */
	public open(param:any):void{
		if(param.oper === "createRoom"){
			this.tableId.text = param.tableId;
		}else{
			if(param.HandsCard.length){
				//掉线后重新进入
				//生成掉线前出牌数据
				this.skin.currentState = this.TYPE_GAME;
			}else{
				//第一次进入房间
				this.skin.currentState = this.TYPE_WAIT;
			}
		}
		this.createRoleInfo(param.userInfoList);
		/**测试数据 */
		this.startNewGame(5,5,data.Seat.East,4,this.testCardobj);
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
		for(var i:number = 0,len:number = userInfoList.length,item:proto.UserInfoWithSeat;i<len;i++){
			item = userInfoList[i];
			this["roleInfo_"+item.seat].seat = item.seat;
			this["roleInfo_"+item.seat].setRoleInfo(item.userInfo);
		}
	}
	/**
	 * 离开房间
	 */
	public leaveSeat(seat:number):void{
		this["roleInfo_"+seat].showLeave();
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
	private startNewGame(num1:number,num2:number,seat:number,peopleNum:number,cardGather:number[]):void{
		if(this.cardMap && this.cardMap.parent && this.cardMap.parent.contains(this.cardMap)){
			this.cardMap.parent.removeChild(this.cardMap);
		}
		this.cardMap = new CardMap();
		this.curGameState = 1;
		this.addChild(this.cardMap);
		this.cardMap.x = (Config.w_width>>1) - (this.cardMap.width>>1);
		this.cardMap.y = (Config.w_height>>1) - (this.cardMap.height>>1);
		this.cardMap.calculBlock(num1,num2,seat,peopleNum);
		var cardArr:number[] = [];
		cardArr =  cardArr.concat(cardGather);
		CardTransFormUtil.startGetCard(seat,peopleNum,cardArr,this.cardSprite,(dataObj)=>{
			if(dataObj.final){
				//切牌发牌完毕
				this.cardSprite.removeChildren();
				var arr:number[] = GlobalFunc.sortRule(GlobalFunc.NORMALIZE,"",cardGather);
				this.addCardGroup(arr);
				// this.outCard(data.Seat.North,"0x21");
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
						this.cardMap.removeItem();
					}
				}else{
					//当前为别的玩家手牌显示
					for(var i:number = 0;i<dataObj.num;i++){
						var img:eui.Image = new eui.Image();
						img.source = this.assetObj[dataObj.seat];
						this.seatObj[dataObj.seat].addChild(img);
						if(dataObj.seat === data.Seat.North){
							img.x = this.seatObj[dataObj.seat].numChildren * img.width;
						}else{
							img.y = this.seatObj[dataObj.seat].numChildren * img.width;
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
			var cardTempleId:number = CardTransFormUtil.trasnFormCardIdWay2(cardGroup[i]);
			var cardTemple:data.CardConfigTemple = temple.TempleManager.select(cardTempleId) as data.CardConfigTemple;
			var card:HandCardItem = new HandCardItem(cardTemple);
			if(!ifAddCard){
				card.x = card.width*this.cardSprite.numChildren;
			}else{
				card.x = this.cardSprite.numChildren * card.width + card.width;
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
	private onCardTouchEnd(evt:egret.TouchEvent):void{
		if(this.clickState){
			this.clickState = false;
			var interVal:number = this.curStageY - evt.stageY;
			if(interVal > Config.h_handCard){
				//==此处需要与服务器进行交互===
				//假设出牌成功
				this.outCard(data.Seat.South);
			}
		}
	}
	/**出牌 */
	private outCard(seat:number,iconId:string = ""):void{
		if(seat === data.Seat.South){
			var obj:any = {icon:this.curTarget.path_icon};
			//打出牌添加数据源
			this.addCardItem(this.southCollect,obj);
			//移除手牌item
			var curX:number = this.curTarget.x;
			this.cardSprite.removeChild(this.curTarget);
			if(this.curTarget != this.newCard){
				this.setCardToPosition(curX);
			}
		}else{
			var mx:number = 0;
			var my:number = 0;
			var moveStepObj:any = {};
			if(seat === data.Seat.East || seat === data.Seat.West){
				my = 1;mx = 0;
			}else{
				mx = 1;my = 0;
			}
			//其他玩家打出手牌
			var index:number = (Math.random()*12+1)>>0;
			this.addCardItem(this.dachuObj[seat],{cardBg:1,icon:Config.path_card + iconId + ".png"});
			var len:number = this.seatObj[seat].numChildren;
			var arr:any[] = [];
			for(var i:number = 0;i<len;i++){
				if(i>index){
					arr.push(this.seatObj[seat].getChildAt(i));
				}
			}
			this.seatObj[seat].removeChildAt(index);
			for(var j:number = 0;j<arr.length;j++){
				var item:eui.Image = arr[j];
				if(mx){
					moveStepObj = {x:item.x - item.width};
				}
				if(my){
					moveStepObj = {y:item.y - item.height};
				}
				egret.Tween.get(item).to(moveStepObj,this.moveStep).call(()=>{
					egret.Tween.removeTweens(item);
				},this)
			}
		}
		
	}
	/**设置牌位置 */
	private setCardToPosition(curX:number):void{
		var len:number = this.cardSprite.numChildren-1;
		var setX:number = -1;
		var curMoveGather:HandCardItem[] = [];
		for(var i:number = 0,item:HandCardItem;i<len;i++){
			item = this.cardSprite.getChildAt(i) as HandCardItem;
			var cardType:number = CardTransFormUtil.getCardType(Number(item.cardId));
			var newCardType:number = CardTransFormUtil.getCardType(Number(this.newCard.cardId));
			if(newCardType === cardType){
				//找到了同类型的卡牌
				var cardId:number = CardTransFormUtil.trasnFormCardIdWay2(Number(item.cardId));
				var newCardId:number = CardTransFormUtil.trasnFormCardIdWay2(Number(this.newCard.cardId));
				if(newCardId <= cardId){
					//新摸到的牌 在当前卡牌后面
					setX = item.x;
					break;
				}
			}else{
				continue;
			}
		}
		if(setX != -1){
			this.searchMoveCardGroup(curX,setX);
		}else{
			//未找到同类新卡牌
			egret.Tween.get(this.newCard).to({x:this.newCard.x - this.newCard.width},this.moveStep).call(()=>{
				egret.Tween.removeTweens(this.newCard);
			},this)
		}
	}
	private searchMoveCardGroup(curX:number,setX:number):void{
		var moveGather:HandCardItem[] = [];
		var diction:number = 0;
		if(setX != curX && Math.abs(curX - setX) != Config.w_handCard){
			//当前新卡牌与打出卡牌不在同一个位置
			if(setX < curX){
				diction = 1;
				//当前设置位置在打出牌位置前面
				for(var i:number = 0;i<this.cardSprite.numChildren;i++){
					var item:HandCardItem = this.cardSprite.getChildAt(i) as HandCardItem;
					if(item.x >= setX && item.x < curX){
						moveGather.push(item);
					}
				}
			}else{
				diction = -1;
				for(var j:number = 0;j<this.cardSprite.numChildren;j++){
					var item:HandCardItem = this.cardSprite.getChildAt(j) as HandCardItem;
					if(item.x <= setX && item.x > curX){
						moveGather.push(item);
					}
				}
			}
			egret.Tween.get(this.newCard).to({y: - this.newCard.height - 20},this.moveStep)
			.to({x:setX},((this.newCard.x - setX)/this.newCard.width)*this.moveStep).call(()=>{
				for(var m:number = 0;m<moveGather.length;m++){
					var item:HandCardItem = moveGather[m];
					egret.Tween.get(item).to({x:(item.x+diction*item.width)},this.moveStep).call(()=>{
						egret.Tween.removeTweens(item);
					},this)
				}
			},this).to({y:0},this.moveStep).call(()=>{
				egret.Tween.removeTweens(this.newCard);
			},this);
			
		}else{
			egret.Tween.get(this.newCard).to({y: - this.newCard.height - 20},this.moveStep)
			.to({x:curX},((this.newCard.x - curX)/this.newCard.width)*this.moveStep)
			.to({y:0},this.moveStep).call(()=>{
				egret.Tween.removeTweens(this.newCard);
			},this);
		}
	}
	private onTouchHandler(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.buttonYaoQing:
				//邀请微信好友
				break;
			case this.readyBtn:
				this.applyFunc(GameConsts.RAISEHANDS_C2S);
				break;
		}
	}
}