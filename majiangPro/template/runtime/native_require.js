
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/experimental/experimental.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"bin-debug/data/proto/MessageHandle.js",
	"bin-debug/mvc/view/BaseEuiView.js",
	"bin-debug/base/BaseEuiLayer.js",
	"bin-debug/base/BaseSence.js",
	"bin-debug/base/BaseSpriteLayer.js",
	"bin-debug/base/BaseClass.js",
	"bin-debug/data/proto/Pro.js",
	"bin-debug/mvc/controller/BaseController.js",
	"bin-debug/mvc/model/BaseModel.js",
	"bin-debug/mvc/proxy/BaseProxy.js",
	"bin-debug/model/pop/popCreateRoom/PopCreateRoomController.js",
	"bin-debug/component/MyHSlider.js",
	"bin-debug/component/PlayerRoleInfo.js",
	"bin-debug/component/TimeComponent.js",
	"bin-debug/config/Config.js",
	"bin-debug/data/DataCenter.js",
	"bin-debug/data/Enums.js",
	"bin-debug/app/App.js",
	"bin-debug/data/proto/MessageType.js",
	"bin-debug/data/proto/messType.js",
	"bin-debug/component/AddComponent.js",
	"bin-debug/data/proto/Proto.js",
	"bin-debug/data/temple/CardConfigTemple.js",
	"bin-debug/data/TempleManager.js",
	"bin-debug/enum/ControllerConst.js",
	"bin-debug/enum/SceneConsts.js",
	"bin-debug/enum/ViewConst.js",
	"bin-debug/event/ChangeEvent.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/model/gamePanel/GameConsts.js",
	"bin-debug/model/gamePanel/GameController.js",
	"bin-debug/model/gamePanel/GameModel.js",
	"bin-debug/model/gamePanel/GameProxy.js",
	"bin-debug/model/gamePanel/ViewGame.js",
	"bin-debug/model/loading/LoadingConsts.js",
	"bin-debug/model/loading/LoadingController.js",
	"bin-debug/model/loading/loadingView.js",
	"bin-debug/model/login/LoginConsts.js",
	"bin-debug/model/login/LoginController.js",
	"bin-debug/model/login/LoginModel.js",
	"bin-debug/model/login/LoginProxy.js",
	"bin-debug/model/login/ViewLogin.js",
	"bin-debug/model/pop/popCreateRoom/PopCreateRoom.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/model/pop/popCreateRoom/PopCreateRoomModel.js",
	"bin-debug/model/pop/popCreateRoom/PopCreateRoomProxy.js",
	"bin-debug/model/pop/popJoinRoom/PopJoinRome.js",
	"bin-debug/model/pop/popJoinRoom/PopJoinRoomController.js",
	"bin-debug/model/pop/popJoinRoom/PopJoinRoomModel.js",
	"bin-debug/model/pop/popJoinRoom/PopJoinRoomProxy.js",
	"bin-debug/model/pop/popScore/PopMyScoreController.js",
	"bin-debug/model/pop/popScore/PopScore.js",
	"bin-debug/model/pop/popSystemSet/PopSystemSet.js",
	"bin-debug/model/pop/popSystemSet/PopSystemSetController.js",
	"bin-debug/model/startPanel/StartConsts.js",
	"bin-debug/model/startPanel/StartController.js",
	"bin-debug/model/startPanel/StartModel.js",
	"bin-debug/model/startPanel/StartProxy.js",
	"bin-debug/model/startPanel/ViewStart.js",
	"bin-debug/component/CardItem.js",
	"bin-debug/mvc/ControllerManager.js",
	"bin-debug/component/CardMap.js",
	"bin-debug/component/HandCardItem.js",
	"bin-debug/component/MyButton.js",
	"bin-debug/mvc/view/BaseSpriteView.js",
	"bin-debug/mvc/view/IBaseView.js",
	"bin-debug/mvc/ViewManager.js",
	"bin-debug/net/Processor.js",
	"bin-debug/net/SocketManager.js",
	"bin-debug/sence/GameSence.js",
	"bin-debug/sence/LayerManager.js",
	"bin-debug/sence/SenceLoadIng.js",
	"bin-debug/sence/SenceManager.js",
	"bin-debug/sence/UISence.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/utils/CardTransFormUtil.js",
	"bin-debug/utils/Dictionary.js",
	"bin-debug/utils/DisplayUtils.js",
	"bin-debug/utils/Global.js",
	"bin-debug/utils/GlobalFunc.js",
	"bin-debug/utils/LListener.js",
	"bin-debug/utils/MessageCenter.js",
	"bin-debug/utils/MoviePool.js",
	"bin-debug/utils/ObjectPool.js",
	"bin-debug/utils/ResourceUtils.js",
	"bin-debug/utils/SoundUtils.js",
	"bin-debug/utils/StageUtils.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 1280,
		contentHeight: 720,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};