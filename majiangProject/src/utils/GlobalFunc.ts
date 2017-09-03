module GlobalFunc {
	/**排序方式--从小到大 */
	export var NORMALIZE:string = "normalize";
	/**排序方式--从大道小 */
	export var REVERSE:string = "reverse";

	/**深复制 */
	export function deepCopy(source:any):any{
		var arr:any[] = [];
		for(var i:number = 0;i<source.length;i++){
			var result = {};
			for(var key in source[i]){
				result[key] = source[i][key]
			}
			arr.push(result);
		}
		return arr;
	}
	/**深复制字典 */
	export function deepCopyDict(source:Dictionary):Dictionary{
		var dic:Dictionary = new Dictionary();
		for(var key in source.dict){
			var arr:any[] = GlobalFunc.deepCopy(source.dict[key]);
			dic.add(key,arr);
		}
		return dic;
	}
	//验证内容是否包含空格
	export function checkTextSpace(content,temp = 1){
		var reg=/(^\s+)|(\s+$)/g;
		//temp用来标识内容是否允许存在空格1为可存在0为不存在
		// if(temp==1){
			reg = /\s+/g;
		// }
		var content2:string = content.replace(reg,"");
		if(!content2){
			return false;
		}
		return true;
	}
	/**读取单个属性 */
	export function searchAttrValue(searchId:number,searchSource:proto.AttrValue[]):number{
		for(var i:number = 0,len:number = searchSource.length,item:proto.AttrValue;i<len;i++){
			item = searchSource[i];
			if(searchId === item.attrID){
				return item.myvalue;
			}
		}
	}
	/**读取多个属性 */
	export function searchMoreAttrValue(searchIdList:number[],searchSource:proto.AttrValue[]):any{
		var obj:any = {};
		for(var j:number = 0,len2:number = searchIdList.length,id:number;j<len2;j++){
			id = searchIdList[j];
			for(var i:number = 0,len:number = searchSource.length,item:proto.AttrValue;i<len;i++){
				item = searchSource[i];
				if(item.attrID === id){
					obj[id] = item.myvalue;
					continue;
				}
			}
		}
		return obj;
	}
	/**排序规则 */
	export function sortRule(type:string,comparingValues:string,sourceCollection:any[]):any{
		var relationNum:number = 1;
		if(type === GlobalFunc.NORMALIZE){
			relationNum = 1;
		}else{
			relationNum = -1;
		}
		function compareFunc(item1:any,item2:any):number{
			var a:number,b:number;
			if(comparingValues!=""){
				a = item1[comparingValues];
				b = item2[comparingValues];
			}else{
				a = item1;
				b = item2;
			}
			if(a > b){
				return relationNum;
			}else if(a<b){
				return -relationNum;
			}else{
				return 0;
			}
		}
		return sourceCollection.sort(compareFunc);
	}
	/**根据对象键值排序 */
	export function sortByKey(source:any):any{
		var objKeys:string[] = Object.keys(source);
		return source;
	}
	/**时间格式化 */
	export function formatTime(timespan:number,ufc:boolean = true,extra:boolean = false):string{
		var data = new Date((timespan>0?timespan:-timespan)*1000);
		var year:number = data.getFullYear();
		var day:number = data.getDate();
		var hour:number = data.getHours();
		var month:number = data.getMonth()+1;
		var day:number = data.getDate();
		var minutes:number = data.getMinutes();
		var seconds:number = data.getSeconds();
		var str2:string = "";
		var str:string = ""
		if(ufc){
			str2 = year +"-" +(month<10?"0"+month:month)+"-"+(day<10?"0"+day:day)+"\t";
			str = (hour<10?"0"+hour:hour)+":"+(minutes<10?"0"+minutes:minutes)+":"+(seconds < 10?"0"+seconds:seconds);
			return str2+str;
		}else{
			if(extra){
				hour = Math.floor(timespan/3600);
				minutes = Math.floor(timespan%3600/60);
				seconds = Math.floor(timespan%3600%60);
				str = (hour<10?"0"+hour:hour)+":"+(minutes<10?"0"+minutes:minutes)+":"+(seconds < 10?"0"+seconds:seconds);
			}else{
				day = Math.floor(timespan/24/60/60);
				hour = Math.floor(timespan%(24*60*60)/3600);
				minutes = Math.floor(timespan%(24*60*60)%3600/60);
				str = day+"天"+hour+"时"+minutes+"分";
			}
			
			return str;
		}
	}
}