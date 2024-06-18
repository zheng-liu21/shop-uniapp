<template>
	<view>
	<view class='goods-item' v-for='g in mainStore.collectList.collect' :key='g.id'>
		<uni-row class="demo-uni-row" >
			<!-- 商品图 -->
			<uni-col :span="12">
				<image class='goods-pic' :src="g.cover"  @click='toGoodsDetail(g.id)'></image>
			</uni-col>
			<!-- 商品的价格和描述 -->
			<uni-col :span="8">
				<view class="info" @click='toGoodsDetail(g.id)' >
					<view class="g-title">{{g.title}}</view>
					<view class="g-desc">{{g.desc}}</view>
					<view class="g-price">￥{{g.price}}/份</view>
				</view>
			</uni-col>
			<!-- 取消收藏 -->
			<uni-col :span="4">
				<view class="cart-icon" @click='delCollect(g)' >
					<uni-icons type="trash-filled" size="24" color="#ff557f"></uni-icons>
				</view>
			</uni-col>
		</uni-row>
	
	</view>
	</view>
</template>

<script setup>
	import {
		reactive
	} from "vue";
	
	import { store } from "../../stores/index.js";
	
	const mainStore = store();

	const data = reactive({
		collectList:[{
			id:1,
			goods:{
				id:1,
				cover: '../../static/goods/苹果.jpg',
				title:"苹果",
				desc:"大凉山苹果",
				price:"6.20",
				norms:"500g/份",
				producer:"大凉山",
				details:"",
				group:1,
				sales:3,
				stock:996
			}
		},{
			id:2,
			goods:{
				id:2,
				cover: '../../static/goods/螃蟹.png',
				title:"螃蟹",
				desc:"好吃的帝王蟹",
				price:"66.39",
				group:1,
				sales:3,
				stock:996
			}
		}]
		
	})

	//取消收藏
	const delCollect = () => {
		// 取消成功
		uni.showToast({
			title: "取消成功!"
		})
		// 跳转到上级页面
		setTimeout(() => {
			uni.navigateBack()
		}, 1000)
	}

	
</script>


<style scoped lang="scss">
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
		.info{
			// 商品的标题
			.g-title{
				font-size: 30upx;
				height: 100upx;
				line-height: 100upx;
			}
			// 商品的描述
			.g-desc{
				font-size: 20upx;
				height: 100upx;
				line-height: 25upx;
				color: #8b8b8b;
			}
			// 商品的价格
			.g-price{
				font-weight: bold;
				color: #ff557f;
				font-size: 30upx;
				height: 100upx;
				line-height: 100upx;
			}
		}
		// 购物车图标样式
		.cart-icon{
			width: 50px;
			text-align: center;
			line-height: 300upx;
			image{
				width: 30px;
				height: 30px;
				background: #ececec;
				border-radius: 50%;
			}
		}
	}
</style>
