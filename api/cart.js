//封装购物车具体的接口调用
import http from './request.js'
export default{
	
	// 添加商品到购物车
	addGoods(params) {
		return http.post('/cart/addGoods', params, true)
	},
	// 获取购物车中的商品列表
	getCartGoods(params) {
		return http.post('/goods/findCart', params, true)
	},
	// 修改购物车中商品的状态
	checkedCartGoods(params) {
		return http.put('/cart/checkedCartGoods', params, true)
	},
	// 修改购物车中商品的数量
	updateGoodsNumber(params) {
		return http.put('/cart/updateGoodsNumber', params, true)
	},
	// 删除购物车中的商品
	deleteCartGoods(params) {
		return http.delete('/api/cart/deleteCartGoods',params, true)
	},
	// 获取购物车已选中的商品列表
	getCheckedCartGoods(params) {
		return http.post('/cart/getCartGoods', params, true)
	}
}