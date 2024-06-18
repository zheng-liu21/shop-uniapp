//封装用户具体的接口调用
import http from './request.js'
export default{
	//登录接口
	login(params){
		return http.post('/user/login',params)
	},
	//注册接口
	
	//刷新token
	
	//校验token
	
	//获取用户信息
	getUserInfo() {
		return http.get('/user/currentUser',{},true)
	},
	//获取用户收货地址列表
	getAddress() {
		return http.get('/address/getAddressByUser', {}, true)
	},
	
	// 获取省的数据
	getProvince(countryName) {
		return http.post(`/address/getProvince?countryName=${countryName}`,{},true)
	},
	
	// 获取市的数据
	getCity(params) {
		return http.post('/address/getCity',params,true)
	},
	
	// 获取县区的数据
	getCounty(params) {
		return http.post('/address/getCounty',params,true)
	},
	
	//更新收货地址
	updateAddress(params){
		return http.post('/address/updateAddress',params,true)
	},
	
	//添加收货地址
	createAddress(params){
		return http.post('/address/createAddress',params,true)
	},
	//更新用户信息
	updateUser(params){
		return http.post('/user/updateUser',params,true)
	},
	
	//发送短信验证码
	sendMsg(params){
		return http.post('/msg/sendMsg',params,true)
	},
	//退出
	logout(){
		return http.post('/logout',{},true)
	},
	//验证码是否正确
	changeMobile(params){
		return http.post('/user/changeMobile',params,true)
	},
	// 确认更换手机号
	changeSubmit(params){
		return http.post('/user/changeSubmit',params,true)
	},
	
	//保存修改密码
	savePwd(params){
		return http.post('/user/savePwd',params,true)
	}
	
}