import {
	defineStore
} from 'pinia'
import api from '../api/index.js'

export const store = defineStore('main', {
	// 类似于Vue2组件中的data，用于存储全局状态数据，但有两个要求
	// 1. 必须是函数，目的是为了在服务端渲染的时候避免交叉请求导致的数据状态污染， 必须是箭头函数，这样是为了更好的 TS 类型推导
	// 2. 使用容器中的 state
	// 3. 通过 getter 修改 state 
	// 4. 使用容器中的 action 同步和异步请求

	// 全局数据
	state: () => {
		return {
			token: "",
			userInfo: {},
			// 用户是否登录
			isAuth: false,
			// 商品分类
			goodsGroup: [],
			activeGroupId: null,
			// 保存购物车商品
			cartGoodsList: [],
			// 保存收藏商品的数据
			collectList: [],
			// 用户所有的地址列表
			addrList: []
		}
	},
	// 全局的计算属性
	getters: {
		// 购物车中商品的数量
		cartNumber() {
			return this.cartGoodsList.cart.length
		},
		defaultAddr() {
			return this.addrList.addressList.find(item => {
				return item.is_default
			})
		},
		address() {
			return this.addrList.addressList.filter(item => {
				return !item.is_default
			})
		}

	},
	actions: {

		// 保存登录后的用户信息
		saveLoginStatus(info) {
			this.isAuth = true
			this.token = info.token
			// 存储到uniapp提供的持久化数据存储仓库中
			uni.setStorage({
				key: "isAuth",
				data: true
			})
			uni.setStorageSync("token", info.token)
			// uni.setStorage({
			// 	key: "refresh",
			// 	data: info.refresh
			// })
		},
		saveUserInfo(user) {
			// 保存用户信息
			this.userInfo = user
			uni.setStorage({
				key: "userinfo",
				data: user
			})
		},
		// 保存商品分类信息的方法
		saveGoodsGroup(info) {
			this.goodsGroup = info
			uni.setStorage({
				key: "goodsGroup",
				data: info
			})
		},
		saveActivaGroupId(info) {
			this.activeGroupId = info
		},
		// 保存购物车中数据的方法
		saveCartList(value) {
			this.cartGoodsList = value
			uni.setStorage({
				key: "cart",
				data: value
			})
		},
		// 保存收藏商品数据的方法
		saveCollectList(value) {
			this.collectList = value
			uni.setStorage({
				key: "collect",
				data: value
			})
		},
		//  保存用户的收货地址列表
		saveAddrList(value) {
			this.addrList = value
			uni.setStorage({
				key: "addr",
				data: value
			})
		},
		// 退出登录
		logout() {
			this.isAuth = false
			// 发送请求
			api.user.logout().then(res=>{
				if (res.code === 200) {
					this.userInfo = {}
					uni.clearStorage()
					
					// 跳转到商城首页
					uni.switchTab({
						url: "/pages/index/index"
					})
				}
			})
			
		},


		// 获取购物车中所有的商品
		getCartGoodsList() {
			// 发送请求
			api.cart.getCartGoods().then(res=>{
				if (res.code === 200) {
					// 将购物车中的商品数据保存到pinia的state中
					this.saveCartList(res.data)
				}
			})
		},
		// 添加商品到购物车的方法
		addGoodsCart(goodsId) {
			console.log("userInfo",this.userInfo)
			// 发送请求
			api.cart.addGoods({
				userId:this.userInfo.id,
				goodsId: goodsId
			}).then(res=>{
				// 判断接口请求是否成功
				if (res.code === 200) {
					uni.showToast({
						title: '已为您加入购物车'
					})
					// 更新购物车中的数据
					this.getCartGoodsList()
				}
			})
			
		},
		// 获取已收藏的商品列表
		getCollectList() {
			api.goods.getCollectList().then(res=>{
				if (res.code === 200) {
					this.saveCollectList(res.data)
				}
			})
			
		},
		// 取消收藏的方法
		delCollect(g) {
			api.goods.delCollectGoods({
				userId:this.userInfo.id,
				goodsId: g.id
			}).then(res=>{
				if (res.code === 200) {
					this.getCollectList()
					uni.showToast({
						title: "已取消收藏"
					})
				}
			})
		},
		// 获取所有的收货地址列表
		getAddrList() {
			// 获取用户所有的收货地址
			api.user.getAddress().then(res=>{
				if (res.code === 200) {
					// 保存收货地址
					this.saveAddrList(res.data)
				}
			})
			
		},
		// 加载用户数据的方法
		loadData() {
			// 加载用户收货地址
			this.getAddrList()
			// 加载用户购物车商品
			this.getCartGoodsList()
			// 加载用户收藏列表
			this.getCollectList()
		}
	}
})