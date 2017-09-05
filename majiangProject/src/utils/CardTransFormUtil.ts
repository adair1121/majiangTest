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
	/**卡牌转换way2 */
	public static trasnFormCardIdWay2(cardNum:number):number{
		return parseInt(cardNum+"");
	}
	/**
	 * 卡牌排序
	 */
	public static cardSort(cardGather:number[]):any[]{
		var arr:number[] = GlobalFunc.deepCopy(cardGather);
		var cardArr:any[] = [];
		for(var i:number = 0;i<arr.length;i++){
			var obj:any = {}
			var cardNum:number = CardTransFormUtil.trasnFormCardIdWay2(arr[i]);
			obj.card = arr[i];
			obj.transFormCard = cardNum;
			cardArr.push(obj);
		}
		var operArr:any[] = GlobalFunc.sortRule(GlobalFunc.NORMALIZE,"transFormCard",cardArr);
		return operArr;
	}
	
}
