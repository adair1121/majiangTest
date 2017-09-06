class LoginModel extends BaseModel{
	public userInfo:proto.UserInfo;
	public constructor(controller:BaseController) {
		super(controller)
	}
}