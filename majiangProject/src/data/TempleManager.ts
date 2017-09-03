module temple{
    export class TempleManager{
        constructor(){
        }
        public static init():void{
            var txts=[]
            // RES.getResByUrl("resource/cfg/ItemTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
        }
        private static temples: any[]=[];
        //
        public static getFunc(da:any){
            for(var o in da){
                TempleManager.temples[o]=da[o];
            }
            // var obj=TempleManager.temples[1001015];
            // var C:data.UnitTemple=<data.UnitTemple>obj;
            
            // console.log(C.name);
        }
        public static select<T>(id:number):T{
            return <T>TempleManager.temples[id];
        }
    }
}