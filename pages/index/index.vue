<template>
	<view class="container">
		<view class="top_box">
			<!-- 顶部的背景颜色 -->
			<view class="top_back" :style="{background: data.topBackColor}"></view>
			<!-- 轮播图 -->
			<view class="banner">
				<uni-swiper-dot :info="data.banner" :current="data.current" mode="dot" field="content">
					<swiper class="swiper-box" @change="swiperChange">
						<swiper-item v-for="(item, index) in data.banner" :key="index">
							<image :src="item.img"></image>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
			</view>
			<!-- 图片 -->
			<view class='pic'>
				<image src="../../static/ad1.jpg"></image>
			</view>

			<!-- 商品分类的展示 -->
			<uni-grid :column="4" :highlight="true" :showBorder="false" class='group-menu'>
				<uni-grid-item v-for="(item, index) in data.group" :index="index" :key="index">
					<view @click='toGroupPage(item.id)' class="grid-item-box">
						<image :src="item.image"></image>
						<view>{{item.name}}</view>
					</view>
				</uni-grid-item>
			</uni-grid>

			<!-- 推荐商品 -->
			<view class='fire-name'>
				<uni-icons color="#ff557f" type="fire-filled" size="30"></uni-icons>
				<text class="name">推荐商品</text>
			</view>

			<!-- 商品列表 -->
			<view class='goods-item' v-for='g in data.goods' :key='g.id'>
				<uni-row class="demo-uni-row">
					<!-- 商品图 -->
					<uni-col :span="12">
						<image class='goods-pic' :src="g.cover" @click='toGoodsDetail(g.id)'></image>
					</uni-col>
					<!-- 商品的价格和描述 -->
					<uni-col :span="8">
						<view class="info" @click='toGoodsDetail(g.id)'>
							<view class="g-title">{{g.title}}</view>
							<view class="g-desc">{{g.desc}}</view>
							<view class="g-price">￥{{g.price}}/份</view>
						</view>
					</uni-col>
					<!-- 购物车 -->
					<uni-col :span="4">
						<view class="cart-icon" @click='mainStore.addGoodsCart(g.id)'>
							<image src="../../static/tabbar_icon/icon/tab-cart-current.png"></image>
						</view>
					</uni-col>
				</uni-row>

			</view>

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

	const data = reactive({
		topBackColor: "#eea40b",
		//背景切换颜色
		bs: [
			"#eea40b",
			"#e16531",
			"#f2e70f",
			"#cc2f27"
		],
		//背景图列表
		banner: [],
		//当前背景图的索引
		current: 0,
		//商品列表
		goods: [],
		//商品分类列表
		group: []
	})


	// 获取商城首页的数据
	const getData = () => {
		proxy.$api.goods.getIndexData().then(res => {
			if (res.code === 200) {
				data.banner = res.data.banner
				data.goods = res.data.goods
				data.group = res.data.group
				mainStore.saveGoodsGroup(data.group)
			}
		})
	}

	//轮播图切换时执行方法
	const swiperChange = (e) => {
		console.log(e);
		//根据背景图索引位置，从bs中获取一个背景色
		data.current = e.detail.current;
		let index = data.current % 4;
		data.topBackColor = data.bs[index]
	}

	// 跳转到商品详情页
	const toGoodsDetail = (goodsId) => {
		const url = `/pages/goods/detail?id=${goodsId}`
		uni.navigateTo({
			url: url
		})
	}

	// 跳转到分类的菜单
	const toGroupPage = (groupId) => {
		// 将选中的分类id保存到pinia
		mainStore.saveActivaGroupId(groupId)
		// 跳转到分类页面
		uni.switchTab({
			url: '/pages/goods/group',
		})
	}

	onLoad(() => {
		getData()
	})
</script>

<style lang="scss">
	.container {
		font-size: 14upx;
		line-height: 24upx;
	}

	.top_box {

		//顶部的背景样式
		.top_back {
			height: 400upx;
		}

		//海报图
		.banner {
			margin-top: -300upx;
			padding: 10upx;
			text-align: center;

			image {
				width: 100%;
				height: 100%;
				border-radius: 10upx;
			}
		}
	}

	// 图片样式
	.pic {
		width: 100%;
		height: 210upx;
		padding: 10upx 0;
		background: #fff;

		image {
			width: 100%;
			height: 100%;
		}
	}

	// 分类菜单样式
	.group-menu {
		margin-top: 10upx;
		padding: 10upx;
		background: #fff;

		// 单个菜单的样式
		.grid-item-box {
			text-align: center;
			font-size: 28upx;

			image {
				width: 150upx;
				height: 150upx;
				border-radius: 50%;
				background: #eefeff;
			}
		}
	}

	// 推荐商品
	.fire-name {
		font-weight: bold;
		font-size: 38upx;
		color: #ff557f;
		line-height: 80upx;
		height: 80upx;

		.name {
			line-height: 80upx;
		}
	}

	// 单个商品
	.goods-item {
		margin: 15upx;
		background: #fff;
		height: 300upx;
		border-radius: 10upx;

		// 商品图
		.goods-pic {
			width: 300upx;
			height: 300upx;
		}

		// 商品文字信息
		.info {

			// 商品的标题
			.g-title {
				font-size: 30upx;
				height: 100upx;
				line-height: 100upx;
			}

			// 商品的描述
			.g-desc {
				font-size: 20upx;
				height: 100upx;
				line-height: 25upx;
				color: #8b8b8b;
			}

			// 商品的价格
			.g-price {
				font-weight: bold;
				color: #ff557f;
				font-size: 30upx;
				height: 100upx;
				line-height: 100upx;
			}
		}

		// 购物车图标样式
		.cart-icon {
			width: 50px;
			text-align: center;
			line-height: 300upx;

			image {
				width: 30px;
				height: 30px;
				background: #ececec;
				border-radius: 50%;
			}
		}
	}
</style>