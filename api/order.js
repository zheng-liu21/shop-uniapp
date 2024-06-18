//封装订单具体的接口调用
import http from './request.js'
export default{
	// 获取用户的订单数据
	getOrderList(){
		return http.get('/api/order/order/',{},true)
	},
	// 取消订单
	colseOrder(id){
		return http.put(`/api/order/order/${id}/`,{},true)
	},
	// 创建订单
	createOrder(params){
		return http.post('/order/createOrder',params,true)
	},
	// 获取单个订单数据
	getOrderInfo(params){
		return http.post(`/order/getOrderInfo`,params,true)
	},
	// 获取支付宝支付的url地址
	getAlipayUrl(params){
		return http.post('/api/order/alipay/',params,true)
	}
}