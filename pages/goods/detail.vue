<template>
	<view class='detail-box' v-if='data.goods'>
		<!-- 商品图 -->
		<view class='goods-pic'>
			<image :src="data.goods.cover" style="width: 100%" mode="widthFix"></image>
		</view>
		<!-- 商品的基本信息 -->
		<view class=info>
			<view class="name">{{data.goods.title}}</view>
			<view class="desc">{{data.goods.desc}}</view>
			<view class='price'>￥{{data.goods.price}}</view>
			<!-- 销量和库存 -->
			<uni-row class="demo-uni-row">
				<uni-col :span="12">
					<view class="desc">销量: {{data.goods.sales}}</view>
				</uni-col>
				<uni-col :span="12">
					<view class="desc">库存: {{data.goods.stock}}</view>
				</uni-col>
			</uni-row>
		</view>
		<!-- 其他信息 -->
		<uni-list border-full>
			<uni-list-item>
				<template v-slot:header>
					<text class="name1">规格&ensp;&ensp;&ensp;{{ data.goods.norms}}</text>
				</template>
			</uni-list-item>
			<uni-list-item>
				<template v-slot:header>
					<text class="name1">品牌&ensp;&ensp;&ensp;{{ data.goods.producer}}</text>
				</template>
			</uni-list-item>
			<uni-list-item>
				<template v-slot:header>
					<text class="name1">服务&ensp;&ensp;&ensp;品质保证不满意包退</text>
				</template>
			</uni-list-item>
		</uni-list>

		<!-- 商品评价信息 -->
		<view style="margin: 10upx 0;">
			<uni-list border-full>
				<uni-list-item showArrow title="商品评价" rightText="查看" />
			</uni-list>
		</view>
		<!-- 商品详情 -->
		<!-- <view class="detail-info">
			<view style="text-align: center; font-size: 32upx; line-height: 80upx;">图文详情</view>
			<rich-text :nodes="data.goods.details"></rich-text>
		</view> -->

		<!-- 商品导航 -->
		<view class="goods-carts">
			<uni-goods-nav :options="options" :fill="true" :button-group="data.buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
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
		goods: {},

		buttonGroup: [{
			text: '加入购物车',
			backgroundColor: 'linear-gradient(90deg, #55aa7f, #00bd8b)',
			color: '#fff'
		}],

	})

	const options = computed(() => {
		// 判断商品是否已收藏
		const res = mainStore.collectList.collect.find(item => {
			return item.id === data.goods.id
		})
		// 判断是否已收藏
		if (res) {
			return [{
				icon: 'star-filled',
				text: '已收藏',
			}, {
				icon: 'cart',
				text: '购物车',
				info: mainStore.cartNumber
			}]
		} else {
			return [{
				icon: 'star',
				text: '收藏'
			}, {
				icon: 'cart',
				text: '购物车',
				info: mainStore.cartNumber
			}]
		}
		
	})


	onLoad((option) => {
		// 发送请求到后台,加载商品的数据
		const params = {
			id: option.id
		}
		proxy.$api.goods.getGoodsDetail(params).then(res => {
			if (res.code == 200) {
				data.goods = res.data.goods
			}
		})
		

	})


	// 点击收藏或者购物车时调用
	const onClick = (e) => {
		if (e.content.text === '购物车') {
			// 跳转到购物车页面
			uni.switchTab({
				url: "/pages/cart/cart"
			})
		} else if (e.content.text === '收藏') {
			// 收藏商品
			clloectGoods()
		} else {
			// 取消收藏该商品
			// 查找该商品的收藏记录
			const res = mainStore.collectList.collect.find(item => {
				return item.id === data.goods.id
			})
			console.log("res",res)
			// 删除该收藏记录
			mainStore.delCollect(res)
		}



		console.log(e)
		if (e.content.text === '购物车') {
			// 跳转到购物车页面
			uni.switchTab({
				url: "/pages/cart/cart"
			})
		}
	}

	// 收藏商品
	const clloectGoods = () => {
		// 收藏商品
		proxy.$api.goods.collectGoods({
			userId: mainStore.userInfo.id,
			goodsId: data.goods.id
		}).then(res => {
			console.log('收藏商品!')
			if (res.code === 200) {
				uni.showToast({
					title: '收藏成功'
				})
				// 更新收藏列表的数据
				mainStore.getCollectList()
			}
		})

	}

	const buttonClick = (e) => {
		// 点击加入购物车时调用
		console.log(e)
		mainStore.addGoodsCart(data.goods.id)
	}
</script>

<style lang="scss">
	.info {
		padding: 30upx;
		background: #fff;

		.name {
			font: normal 30upx/80upx '微软雅黑';
		}

		.desc {
			color: #818181;
		}

		.price {
			color: #ff557f;
			font-size: 40upx;
			line-height: 80upx;
		}
	}

	.name1 {
		font-size: 28upx;
	}

	.detail-info {
		background: #fff;
	}

	// 商品导航
	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}
</style>