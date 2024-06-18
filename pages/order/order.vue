<template>
	<view class='order_box'>
		<view class='tops'>
			<view class="item" @click='updateShow(1)'>
				<uni-icons color="#ffaa00" type="shop" size="30"></uni-icons>
				<view>
					<text style="color: #ffaa00;" v-if='data.showStatus===1' class="active">待支付</text>
					<text style="color: #7d7d7d;" v-else>待支付</text>
				</view>
			</view>
			<view class="item" @click='updateShow(2)'>
				<uni-icons color="#aa557f" type="shop" size="30"></uni-icons>
				<view>
					<text style="color: #aa557f;" v-if='data.showStatus===2' class="active">待发货</text>
					<text style="color: #7d7d7d;" v-else>待发货</text>
				</view>
			</view>
			<view class="item" @click='updateShow(4)'>
				<uni-icons color="#00aaff" type="shop" size="30"></uni-icons>
				<view>
					<text style="color: #00aaff;" v-if='data.showStatus===4' class="active">待评价</text>
					<text style="color: #7d7d7d;" v-else>待评价</text>
				</view>
			</view>
			<view class="item" @click='updateShow(0)'>
				<uni-icons color="#55aa7f" type="shop" size="30"></uni-icons>
				<view>
					<text style="color: #55aa7f;" v-if='data.showStatus===0' class="active">全部</text>
					<text style="color: #7d7d7d;" v-else>全部</text>
				</view>
			</view>
		</view>
		<view v-for='order in showOrderList' :key='order.id'>
			<uni-card>
				<!-- 订单卡片顶部区域 -->
				<template v-slot:title>
					<view class='cart_top'>
						<text>订单号：{{order.order_code}}</text>
						<text v-if='order.status===1' style="color: crimson;">待支付</text>
						<text v-else-if='order.status===2' style="color:#aa5500">待发货</text>
						<text v-else-if='order.status===3' style="color: #55aa00;">配送中</text>
						<text v-else-if='order.status===4' style="color: #55aa7f;">待评价</text>
						<text v-else-if='order.status===5' style="color:darkgreen;">已完成</text>
						<text v-else-if='order.status===6' style="color:darkgray;">已关闭</text>
					</view>
				</template>
				<!-- 订单卡片中间的商品 -->
				<view class='cart-goods'>
					<!-- 单个商品展示的盒子 -->
					<view class='goods' v-for='g in order.ordergoods_set' :key="g.id">
						<!-- 商品图 -->
						<image :src="g.goods.cover"></image>
						<!-- 商品价格和商品名 -->
						<view class='info'>
							<!-- 商品名 -->
							<view class='title'>{{g.goods.title}}</view>
							<!-- 商品价格 -->
							<view class='price'>￥{{g.goods.price}}</view>
						</view>
						<!-- 商品的数量 -->
						<view class='number'>
							x {{g.number}}
						</view>
					</view>

					<!-- 订单的金额 -->
					<view class='amount'>
						<text>总计{{order.ordergoods_set.length}}件商品,实付款</text>
						<text style="color: #ff557f;">{{order.amount}}</text>
						<text>元</text>
					</view>
				</view>


				<!-- 订单卡片底部的内容 -->
				<template v-slot:actions>
					<view class="cart-btm">
						<view>
							<text>创建时间：</text>
							<uni-dateformat :date="order.create_time"></uni-dateformat>
						</view>
						<view>
							<button @click='colseOrder(order.id)' v-if='order.status===1' type="warn" plain
								size="mini">取消</button>
							<button @click='toPay(order.id)' v-if='order.status===1' size="mini"
								type="primary">支付</button>
							<button v-else-if='order.status===4' size="mini" type="primary">评价</button>
						</view>
					</view>
				</template>
			</uni-card>
		</view>


	</view>
</template>

<script setup>
	import {
		computed,
		reactive
	} from "vue";

	const data = reactive({

		orderList: [{
			id: 1,
			order_code: "Y0001",
			status: 1, //待支付
			ordergoods_set:[{
				id:1,
				goods:{
					cover:'../../static/goods/苹果.jpg',
					title:'苹果',
					price:"6.20"
				},
				number:10	
			},
			{
				id:2,
				goods:{
					cover:'../../static/goods/苹果.jpg',
					title:'苹果',
					price:"6.20"
				},
				number:10	
			}],
			amount: 100,
			create_time: "2023-04-15 19:55:10",
		},{
			id: 2,
			order_code: "Y0002",
			status: 2, //待发货
			ordergoods_set:[{
				id:1,
				goods:{
					cover:'../../static/goods/苹果.jpg',
					title:'苹果',
					price:"6.20"
				},
				number:10	
			},
			{
				id:2,
				goods:{
					cover:'../../static/goods/苹果.jpg',
					title:'苹果',
					price:"6.20"
				},
				number:10	
			}],
			amount: 100,
			create_time: "2023-04-15 19:55:10",
		},{
			id: 3,
			order_code: "Y0003",
			status: 3, //配送中
			ordergoods_set:[{
				id:1,
				goods:{
					cover:'../../static/goods/苹果.jpg',
					title:'苹果',
					price:"6.20"
				},
				number:10	
			},
			{
				id:2,
				goods:{
					cover:'../../static/goods/苹果.jpg',
					title:'苹果',
					price:"6.20"
				},
				number:10	
			}],
			amount: 100,
			create_time: "2023-04-15 19:55:10",
		},{
			id: 4,
			order_code: "Y0004",
			status: 4, //待评价
			ordergoods_set:[{
				id:1,
				goods:{
					cover:'../../static/goods/苹果.jpg',
					title:'苹果',
					price:"6.20"
				},
				number:10	
			},
			{
				id:2,
				goods:{
					cover:'../../static/goods/苹果.jpg',
					title:'苹果',
					price:"6.20"
				},
				number:10	
			}],
			amount: 100,
			create_time: "2023-04-15 19:55:10",
		},{
			id: 5,
			order_code: "Y0005",
			status: 5, //已完成
			ordergoods_set:[{
				id:1,
				goods:{
					cover:'../../static/goods/苹果.jpg',
					title:'苹果',
					price:"6.20"
				},
				number:10	
			},
			{
				id:2,
				goods:{
					cover:'../../static/goods/苹果.jpg',
					title:'苹果',
					price:"6.20"
				},
				number:10	
			}],
			amount: 100,
			create_time: "2023-04-15 19:55:10",
		},{
			id: 6,
			order_code: "Y0006",
			status: 6, //已关闭
			ordergoods_set:[{
				id:1,
				goods:{
					cover:'../../static/goods/苹果.jpg',
					title:'苹果',
					price:"6.20"
				},
				number:10	
			},
			{
				id:2,
				goods:{
					cover:'../../static/goods/苹果.jpg',
					title:'苹果',
					price:"6.20"
				},
				number:10	
			}],
			amount: 100,
			create_time: "2023-04-15 19:55:10",
		}],
		// 显示订单的订单状态
		showStatus: 1
	})
	const showOrderList = computed(() => {
		if (data.showStatus === 1) {
			// 返回待支付的订单
			return data.orderList.filter(item => {
				return item.status === 1
			})
		} else if (data.showStatus === 2) {
			// 返回待发货的订单
			return data.orderList.filter(item => {
				return item.status === 2
			})
		} else if (data.showStatus === 4) {
			// 返回待评价的订单
			return data.orderList.filter(item => {
				return item.status === 4
			})
		} else {
			// 返回首页的订单
			return data.orderList
		}
	})

	// 去支付
	const toPay = (id) => {
		uni.navigateTo({
			url:`/pages/order/pay?id=${id}`
		})
	}
	//获得所有订单
	const getAllOrder = () => {

	}

	// 切换显示的订单状态
	const updateShow = (number) => {
		data.showStatus = number
	}

	// 发送请求，取消订单
	const colseOrder = () => {
		uni.showToast({
			title: "订单已关闭"
		})

	}
</script>

<style scoped lang="scss">
	.order_box {

		// 订单页顶部分类菜单
		.tops {
			height: 120upx;
			background: #fff;
			display: flex;
			padding: 10upx;

			.item {
				flex: 1;
				text-align: center;
			}
		}

		.active {
			border-bottom: solid 5upx #55aa00;
		}

		// 卡片的顶部样式
		.cart_top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-weight: bold;
			height: 60upx;
			border-bottom: solid 2upx #d3d3d3;
		}

		// 卡片底部的样式
		.cart-btm {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 80upx;
			border-top: solid 2upx #d3d3d3;

			button {
				height: 50upx;
				line-height: 50upx;
				border-radius: 25upx;
			}
		}

		// 卡片中间的订单商品
		.cart-goods {
			.amount {
				text-align: right;
				font-weight: bold;
			}

			.goods {
				display: flex;
				height: 140upx;
				align-items: center;

				image {
					width: 120upx;
					height: 120upx;
				}
			}

			.info {
				flex: 1;
				padding-left: 20upx;

				.title {
					color: #000;

				}

				.price {
					color: #ff557f
				}
			}
		}



	}
</style>