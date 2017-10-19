# majiangTest

> 相关协议的初步调试信息
##当前完成协议的初步测试
* 1.登录协议初步调试        s_LoginAccount
* 2.创建房间初步调试        s_CreateRoom
* 3.玩家加入房间初步调试    s_EnterRoom
* 4.玩家举手的初步调试      s_RaiseHands
* 5.玩家初始化手牌调试      s_NotifyHandCards
* 6.其他玩家进入房间初步调试 s_NotifyEnterTable
* 7.玩家出牌初步测试        s_playCard
* 8.通知打牌信息初步测试    s_NotifyPlayCard

> ##待测试协议
>
* 1.通知发牌信息    s_NotifyDealCard
* 2.通知打牌响应    s_NotifyPlayResponse
* 3.通知用户切换    s_NotifyChangeOpUser
* 4.通知摸牌响应    s_DrawCardResponse
* 5.通知打牌响应    s_PlayCardResponse

> ##额外知识点
>
在说之前，我们先了解一个属性：hashCode。我们知道，在egret中有一个HashObject类，它是 Egret顶级类。框架内所有对象的基类，为对象实例提供唯一的hashCode值，这个值是number类型。我们可以利用这个属性作为单个对象引用的唯一id。（当然，如果自定义类没有hashCode类，自己可以写一个接口）我们这里保存的是hashCode 值，而不是对象本身。这样我们既可以知道谁引用谁，又不引用对象本身。
进入正题，先看一个引用类Quote：
class Quote {
         publicconstructor() {
                   this.hashCodes= []; //初始化hash列表
         }
         publicget count(): number{return this.hashCodes.length;} ;//获取引用次数
         publickey: string = "";//资源名字
         publicreTime: number = 500;//资源释放时间
         publicgetTime: number = 0;//生成引用的时候的时间
         privatehashCodes:Array<number>;
         publicputHash(code:number){if(this.hashCodes.indexOf(code) == -1)this.hashCodes.push(code);}
         publicremoveHash(code:number):void{
        let index:number = this.hashCodes.indexOf(code);//如果有了就不计算引用次数
                    if(index != -1) this.hashCodes.splice(index,1);
         }
}
这里Quote是加入关注的对象类。里面hashCodes引用的是对象唯一hashCode值列表，而不是一个对象，这样的好处是不需要引用对象本身。利用hashCodes所以我们可以监控到引用的次数和被引用对象了。putHash接口放入一个hashCode并且检查是否有重复。removeHash也一样，移除一个引用。
有了上面的Quote，我们还要建一个管理类。
下面我要建立一个引用管理类，就叫GCManager吧
先贴核心代码：
private put(hashCode:number, key:string,deley:number = 500): void {
                   varq: Quote = this.quoteList[key];//检查是否已经有该引用
                   if(q == null) {
                            if(this.recycleList[key]) {//如果再回收列表上，要取消放回引用列表中
                                     q= this.recycleList[key];
                                     deletethis.recycleList[key];
                            }elseq = new Quote();//没有，新创建一个（稍后还有pool）。写的有点绕，但就是这么干的
                            q.putHash(hashCode);
                            q.key= key;
                            q.reTime= deley;
                            this.quoteList[key]= q;
                   }else {
                            q.putHash(hashCode);
                   }
         }

put方法就是写入一个资源，我们传入的三个参数，hashCode：资源对象的唯一的hashCode；key：资源的读取路径（key可以是在default.res.json配置资源元素，也可直接传路径）。deley：多久之后执行回收。
注意：上面的recycleList ，quoteList是什么鬼？
其实recycleListf放的是即将回收的对象列表，而quoteList则是引用列表。真正回收是使用在recycleList列表里面的。
在这里我们用了一个Object类型quoteList保存q。而key作为quoteList的键，确保了资源的唯一性。
对key来说，因为我们最终是调用RES.destroyRes(key)来释放资源的，只要可以删除就可以。
下面我们在加一个删除的：
private remove(hashCode:number, key:string): void {
                   varq: Quote = this.quoteList[key];
                   if(q) {
                            q.removeHash(hashCode);
                            if(q.count <= 0) {
                                     deletethis.quoteList[key];
                                     q.getTime= egret.getTimer();
                                     this.recycleList[key]= q;//没有引用了，就加入回收列表
                            }
                   }
         }


当资源回收成功时，如果下次再拿该资源，浏览器会自动从缓存上拿去或者重新加载。

最后一步，制作一个定时器循环检查recycleList检查是否可以回收
private onExecute(t: number): void {
                   varq: Quote;
                   varnow: number = egret.getTimer();
                   for(var key in this.recycleList) {
                            q= this.recycleList[key];
                            if(now - q.getTime >= q.reTime) {//设定的时间到就回收
                                     deletethis.recycleList[key];
                                     letiss:boolean = RES.destroyRes(key);            
                          q.reset();
                                     this.quotePool.push(q);
                            }
                   }
         }

如果引用数目非常多的话，这个Quote是不断要创建的。为了减少性能上的支出，建立了quotePool对象池，对Quote回收和取出。
具体的请大家看附件代码啦！
在外边如何调用？
其实本方法最合适用在经常更换资源的mc上，比如角色模型，特效等。项目中结合ui和粒子等的回收效果更好。
在所在项目中，封装相关资源组件类。比如mc，在加载新资源的时候，先判断和旧资源是否一样，如果一样就不处理，如果不一样就调用remove移除引用和put添加新的资源引用。如：
class MovieClip extends egret.MovieClip
public constructor() {
            super();
}

public play(fileName: string, autoPlay?: boolean, playCount?: number, compFun?: any): void {
     if(this._fileName != fileName){
          GCManager.instance().remove(this.hashCode, this._fileName + "_json"]);
                this.factory.clearCache();
        } 
     GCManager.instance().put(this.hashCode, fileName + "_json");
     //加载资源
      ....
}

抛砖引玉，欢迎大神分享更好的方案啦:lol


