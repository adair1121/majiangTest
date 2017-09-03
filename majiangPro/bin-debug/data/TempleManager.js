var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var temple;
(function (temple) {
    var TempleManager = (function () {
        function TempleManager() {
        }
        TempleManager.init = function () {
            var txts = [];
            // RES.getResByUrl("resource/cfg/ItemTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
        };
        //
        TempleManager.getFunc = function (da) {
            for (var o in da) {
                TempleManager.temples[o] = da[o];
            }
            // var obj=TempleManager.temples[1001015];
            // var C:data.UnitTemple=<data.UnitTemple>obj;
            // console.log(C.name);
        };
        TempleManager.select = function (id) {
            return TempleManager.temples[id];
        };
        return TempleManager;
    }());
    TempleManager.temples = [];
    temple.TempleManager = TempleManager;
    __reflect(TempleManager.prototype, "temple.TempleManager");
})(temple || (temple = {}));
//# sourceMappingURL=TempleManager.js.map