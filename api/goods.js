//封装商品具体的接口调用
import http from './request.js'
export default{
	//获取用户信息
	
	// 获取商城首页的数据
	getIndexData(){
		return http.get('/goods/getIndexData')
	},
	// 获取单个商品的详情
	getGoodsDetail(params){
		return http.post('/goods/findGoodsById',params)
	},
	// 根据商品分类获取商品数据
	getGoodsList(params){
		return http.post('/goods/getGoodsList',params,true)
	},
	// 获取收藏的商品列表
	getCollectList(){
		return http.get('/goods/findCollect',{},true)
	},
	// 收藏商品 
	collectGoods(params){
		return http.post('/collect/addCollect',params,true)
	},
	// 取消收藏
	delCollectGoods(params){
		return http.post(`/collect/delCollect`,params,true)
	}
	
	
	
	
	
}