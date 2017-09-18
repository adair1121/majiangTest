class CardTransFormUtil {
	public static NORTH:number = 10001;
	public static SOUTH:number = 10002;
	public static WEST:number = 10003;
	public static EAST:number = 10004;
	private static curDirection:number = 0;
	public static cardDataArray:number[] = [
		0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09, //万
		0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09, //万
		0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09, //万
		0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09, //万
		0x11,0x12,0x13,0x14,0x15,0x16,0x17,0x18,0x19, //索
		0x11,0x12,0x13,0x14,0x15,0x16,0x17,0x18,0x19, //索
		0x11,0x12,0x13,0x14,0x15,0x16,0x17,0x18,0x19, //索
		0x11,0x12,0x13,0x14,0x15,0x16,0x17,0x18,0x19, //索
		0x21,0x22,0x23,0x24,0x25,0x26,0x27,0x28,0x29, //同
		0x21,0x22,0x23,0x24,0x25,0x26,0x27,0x28,0x29, //同
		0x21,0x22,0x23,0x24,0x25,0x26,0x27,0x28,0x29, //同
		0x21,0x22,0x23,0x24,0x25,0x26,0x27,0x28,0x29 //同
	]
	public constructor() {
		
	}
	/**
	 * 卡牌way1转换
	 */
	public static trasnFormCardIdWay1(cardNum:number):number{
		var num:number = cardNum&0xF0;
		if(num >= 16){
			return parseInt(((cardNum&0xF0)>>4)+""+(cardNum&0x0F));
		}else{
			return cardNum&0x0F;
		}
	}
	/**
	 * 获取卡牌类型
	 */
	public static getCardType(cardNum:number):number{
		var num:number = cardNum&0xF0;
		if(num >= 16){
			return (cardNum&0xF0)>>4
		}else{
			return cardNum&0x0F;
		}
	}
	/**卡牌转换way2 10进制*/
	public static trasnFormCardIdWay2(cardNum:number):number{
		return parseInt(cardNum+"");
	}
	/**
	 * 卡牌排序
	 */
	public static cardSort(cardGather:number[]):any[]{
		var arr:number[] = GlobalFunc.deepCopy(cardGather);
		var cardArr:number[] = [];
		for(var i:number = 0;i<arr.length;i++){
			var cardNum:number = CardTransFormUtil.trasnFormCardIdWay2(arr[i]);
			cardArr.push(cardNum);
		}
		var operArr:any[] = GlobalFunc.sortRule(GlobalFunc.NORMALIZE,"",cardArr);
		return operArr;
	}
	private static zhuangjiaPos:number;
	private static getCardNum:number = 3;
	private static num:number = 0;
	
	/**
	 * 重新开始游戏
	 *  @param:seat {number} 当前庄家枚举位置
	 *  @param:peopleNum {number} 当前游戏人数
	 * 	@param:cardGather {number[]} 当前玩家手牌集合
	 * 	@param:cardSprite {egret.Sprite} 当前玩家手牌集合父级容器
	 *  @param:callBack {Function} 回调函数
	 * 	@param:arg {any} 作用于
	 *  -----------------desc------------------------
	 *  回调返回参数 final{当前是否已经发牌完毕};handCard{当前玩家需要添加的手牌集合 长度为0
	 *  表示添加非自己玩家手牌数};seat {当前需要添加手牌的用户，自己除外}
	 */
	public static startGetCard(seat:number,cardGather:number[],cardSprite:egret.Sprite,callBack,arg):void{
		var arr:number[] = [];
		CardTransFormUtil.zhuangjiaPos = seat;
		CardTransFormUtil.num +=1;
		// if(peopleNum === 2){
		// 	switch(seat){
		// 		case data.Seat.South:
		// 			arr = [data.Seat.South,data.Seat.North];
		// 			break;
		// 		case data.Seat.North:
		// 			arr = [data.Seat.North,data.Seat.South];
		// 			break;
		// 	}
		// }else{
			switch(seat){
				case data.Seat.North:
					arr = [data.Seat.North,data.Seat.East,data.Seat.South,data.Seat.West];
					break;
				case data.Seat.East:
					arr = [data.Seat.East,data.Seat.South,data.Seat.West,data.Seat.North];
					break;
				case data.Seat.South:
					arr = [data.Seat.South,data.Seat.West,data.Seat.North,data.Seat.East];
					break;
				case data.Seat.West:
					arr = [data.Seat.West,data.Seat.North,data.Seat.East,data.Seat.South];
					break;
			}
		// }
		var len:number = arr.length + 1;
		var final:boolean = false;
		for(var j:number = 1;j<len;j++){
			var timeOut = egret.setTimeout((param,time)=>{
				egret.clearTimeout(time);
				var pos:number = arr.shift();
				if(CardTransFormUtil.num > CardTransFormUtil.getCardNum &&param === len-1){
					final = true;
				}
				if(pos === data.Seat.South){
					CardTransFormUtil.divideCard(pos,cardGather.splice(0,4),final,cardSprite,callBack,arg)
				}else{
					CardTransFormUtil.divideCard(pos,[],final,cardSprite,callBack,arg);
				}
				if(!arr.length && CardTransFormUtil.num <=CardTransFormUtil.getCardNum && param===len-1){
					CardTransFormUtil.startGetCard(seat,cardGather,cardSprite,callBack,arg);
				}
				
			},this,500*j,j,timeOut);
		}
	}
	/**切牌 */
	private static divideCard(seat:number,handCard:number[],final:boolean,cardSprite:egret.Sprite,callBackFunc,arg):void{
		if(seat === data.Seat.South){
			if(callBackFunc && arg){
				callBackFunc.call(arg,{final:false,handCard:handCard});
			}
			// this.addCardGroup(handCard);
		}else{
			var num:number = 0;
			if(CardTransFormUtil.num > CardTransFormUtil.getCardNum){
				if(CardTransFormUtil.zhuangjiaPos == seat){
					num = 2;
				}else{
					num = 1;
				}
			}else{
				num = 4;
			}
			if(callBackFunc && arg){
				callBackFunc.call(arg,{final:false,handCard:handCard,num:num,seat:seat});
			}
			// for(var i:number = 0;i<num;i++){
			// 	var img:eui.Image = new eui.Image();
			// 	img.source = this.assetObj[seat];
			// 	this.seatObj[seat].addChild(img);
			// 	if(seat === data.Seat.North){
			// 		img.x = this.seatObj[seat].numChildren * img.width;
			// 	}else{
			// 		img.y = this.seatObj[seat].numChildren * img.width;
			// 	}
			// }
			
		}
		if(final){
			var timeOut = egret.setTimeout(()=>{
				egret.clearTimeout(timeOut);
				CardTransFormUtil.num = 0;
				CardTransFormUtil.overTurnThis(cardSprite,cardSprite,1,callBackFunc,arg);
			},this,300)
		}
	}
	/**翻牌效果 */
	private static overTurnThis(front,back,scale,callBackFun,arg) {
        front.scaleX = 0;
        back.scaleX = scale;
        egret.Tween.get(back).to({ scaleX: 0 }, 300, egret.Ease.circOut).call(() => {
			egret.Tween.get(front).to({ scaleX: scale }, 300, egret.Ease.circIn).call(()=>{
				if(callBackFun && arg){
					callBackFun.call(arg,{final:true});
				}
				// this.cardSprite.removeChildren();
				// var arr:number[] = GlobalFunc.sortRule(GlobalFunc.NORMALIZE,"",this.testCardobj);
				// this.addCardGroup(arr);
			},this);
        },this);
    }
	
	
}

