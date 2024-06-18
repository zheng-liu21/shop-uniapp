<template>
	<view>
		<!-- 显示默认收货地址 -->
		<view>
			<uni-list>
				<uni-list-item clickable @click="toSelectAddr" :title="addressInfo" :note="nameInfo" showArrow
					rightText="选择" :show-extra-icon="true" :extra-icon='Icon' />
			</uni-list>
		</view>

		<!-- 显示订单详情 -->
		<view class='goods'>
			<!-- 订单中的商品信息 -->
			<view v-for='g in data.goods' :key="g.id" class='g_box'>
				<!-- 商品图 -->
				<image :src="g.cover"></image>
				<!-- 商品的信息 -->
				<view class="info">
					<view class='name'>{{g.title}}</view>
					<view class='pri'>{{g.price}} x {{g.number}}件</view>
				</view>
				<view class="number">{{(g.price*g.number).toFixed(2)}} 元</view>
			</view>

		</view>

		<!-- 提交订单的按钮 -->
		<!-- 提交订单 -->
		<view class="submit_btn">
			<uni-row class="demo-uni-row">
				<uni-col :span="12">
					<view class='amount'>总计￥:{{amount.toFixed(2)}}元</view>
				</uni-col>
				<uni-col :span="12">
					<button type="default" @click='submitOrder'>提交订单</button>
				</uni-col>
			</uni-row>

		</view>

	</view>
</template>


<script setup>
	import {
		reactive,
		getCurrentInstance,
		computed
	} from "vue";
	import {
		store
	} from "../../stores/index.js";
	import {
		onLoad
	} from "@dcloudio/uni-app"

	const mainStore = store();
	const {
		ctx,
		proxy
	} = getCurrentInstance()

	const data = reactive({
		// 选中的地址
		addr: {},
		// 购物车中选中的商品
		goods: [],
		// 收货地址的图标
		Icon: {
			color: '#4cd964',
			size: '22',
			type: 'location-filled'
		}
	})

	const addressInfo = computed(() => {
		return data.addr.province + data.addr.city + data.addr.county + data.addr.address

	})

	const nameInfo = computed(() => {
		return data.addr.name + '  ' + data.addr.phone
	})
	// 商品总价
	const amount = computed(() => {
		let sum = 0
		data.goods.forEach(item => {
			sum += item.price * item.number
		})
		return sum
	})


	// 获取购物车已选中的商品
	const getGoodsInfo = () => {
		proxy.$api.cart.getCheckedCartGoods({
			userId: mainStore.userInfo.id
		}).then(res => {
			if (res.code === 200) {
				data.goods = res.data.goodsList
			}
		})
	}

	// 提交订单的方法
	const submitOrder = () => {
		const params = {
			user: mainStore.userInfo.id,
			amount: amount.value,
			address: data.addr.province + data.addr.city + data.addr.county + data.addr.address,
			status: 1,
			goodsList: data.goods
		}

		uni.request({
			url: 'http://127.0.0.1:8084/order/createOrder', 
			data: JSON.stringify(params),
			method: 'POST',
			header: {
				'content-type': 'application/json;charset=utf-8',
				'Authorization': 'Bearer '+ uni.getStorageSync('token')
			},
			success: (res) => {
				uni.showToast({
					title: "订单创建成功"
				})
				const orderId = res.data.data.orderId
				// 跳转到支付页面,
				uni.navigateTo({
					url: `/pages/order/pay?id=${orderId}`
				})

			}
		})


	}

	// 选择地址的方法
	const toSelectAddr = () => {
		uni.navigateTo({
			url: "/pages/order/selectaddr"
		})
	}

	onLoad((item) => {
		// 判断一下是否选择了收货地址
		if (item.id) {
			console.log('item.id：', item.id)
			// 设置选择的地址展示在页面上
			const res = mainStore.addrList.addressList.find(addr => {
				// 注意点：路由传递的参数id为字符串，地址的id为数值，判断时使用==
				return addr.id == item.id
			})
			data.addr = res
		} else {
			// 显示默认的收货地址
			data.addr = mainStore.defaultAddr
		}
		getGoodsInfo()
	})
</script>



<style scoped lang="scss">
	.goods {
		margin-top: 10upx;
		background: #fff;
		padding: 10upx 20upx;

		// 单个商品的样式
		.g_box {
			display: flex;
			align-items: center;
			justify-content: space-between;

			// 商品图
			image {
				width: 150upx;
				height: 150upx;
			}

			// 商品信息
			.info {
				flex: 1;
				text-indent: 20upx;

				.pri {
					color: #828282;
				}


			}

			.number {
				color: #ff5500;
			}
		}
	}

	// 提交订单的按钮
	.submit_btn {
		position: fixed;
		width: 100%;
		bottom: 2upx;
		background: #fff;
		height: 100upx;

		button {
			color: #fff;
			background: #55aa7f;
			height: 74upx;
			line-height: 74upx;
			margin: 0 10upx;
			border-radius: 35upx;
			margin-top: 18upx;
		}

		.amount {
			color: #ff5500;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			font-size: 32upx;
			font-weight: bold;
		}
	}
</style>