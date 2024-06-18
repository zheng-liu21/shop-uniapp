<template>
	<view>
		<view v-if='mainStore.cartGoodsList.cart.length>0'>
			<!-- 显示单个商品 -->
			<view class="goods_box" v-for='g in mainStore.cartGoodsList.cart' :key='g.id'>
				<!-- 是否选中该商品 -->
				<checkbox @click='updateStatus(g)' color="#55aa7f" :checked="g.is_checked" />
				<!-- 商品信息 -->
				<view class='info'>
					<image :src="g.cover" @click='toGoodsDetail(g.id)'></image>
					<view class='desc'>
						<view class="name" @click='toGoodsDetail(g.id)'>{{g.title}}</view>
						<view class='pn'>
							<view class='price'>￥{{g.price}}</view>
							<view class='number'>
								<uni-number-box :max='g.stock' :value="g.number"
									@change="changeNumber($event,g)" />

							</view>
						</view>
					</view>

				</view>

			</view>
			<!-- 提交订单 -->
			<view class="submit_btn">
				<button @click='toSubmitOrder' type="default">去结算</button>
			</view>
		</view>
		<!-- 购物车商品为空 -->
		<view v-else class='cart_null'>
			<image src="../../static/tabbar_icon/icon/tab-cart.png" mode=""></image>
			<view>购物车没有商品哦!</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		getCurrentInstance
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

	// 点击跳转到商品详情页
	const toGoodsDetail = (goodsId) => {
		const url = `/pages/goods/detail?id=${goodsId}`
		uni.navigateTo({
			url: url
		})
	}

	// 跳转到订单提交页面
	const toSubmitOrder = () => {
		uni.navigateTo({
			url: '/pages/order/submit'
		})
	}
	// 修改商品选中状态
	const updateStatus = (g) => {
		if(g.is_checked===1){
			g.is_checked=0
		}else{
			g.is_checked=1
		}
		const params={
			userId:mainStore.userInfo.id,
			goodsId:g.id,
			is_checked:g.is_checked
		}
		// 发送请求修改购物车中商品的状态
		proxy.$api.cart.checkedCartGoods(params).then(res => {
			if (res.code === 200) {
				mainStore.getCartGoodsList()
			}
		})
		
	}

	const changeNumber = (val, g) => {
		const params={
			userId:mainStore.userInfo.id,
			goodsId:g.id,
			number:val
		}
		// 发送请求修改购物车中商品的数量
		proxy.$api.cart.updateGoodsNumber(params).then(res => {
			if (res.code === 200) {
				mainStore.getCartGoodsList()
			}
		})
	}
</script>


<style scoped lang="scss">
	// 购物车中商品的样式
	.goods_box {
		display: flex;
		align-items: center;
		height: 200upx;
		margin: 10upx;
		background: #fff;

		.info {
			flex: 1;
			display: flex;
			padding: 10upx;

			image {
				width: 180upx;
				height: 180upx;
			}

			.desc {
				flex: 1;
				padding-left: 20upx;
				position: relative;

				.name {}

				.pn {
					position: absolute;
					bottom: 5upx;
					display: flex;

					.price {
						color: #ff557f;
						padding-right: 80upx
					}

					.number {
						padding-right: 10upx;
					}
				}

			}

		}
	}

	// 提交订单的按钮
	.submit_btn {
		position: fixed;
		width: 100%;
		bottom: 110upx;

		button {
			color: #fff;
			background: #55aa7f;
			height: 74upx;
			line-height: 74upx;
			margin: 0 10upx;
		}
	}

	// 购物车商品为空
	.cart_null {
		font-size: 20px;
		color: #bfbfbf;
		height: 70vh;
		// 通过flex布局 让内容显示在屏幕中间
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		image {
			width: 200upx;
			height: 200upx;
		}
	}
</style>