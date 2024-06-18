<template>
	<uni-row class="demo-uni-row" :gutter="10">
		<!-- 左侧商品分类列表 -->
		<uni-col :span="7">
			<view class="left_box">
				<uni-list>
					<!-- 所有商品 -->
					<uni-list-item @click='selectGroup' clickable>
						<template v-slot:header>
							<view v-if='data.groupId' class='gr'>所有商品</view>
							<view v-else class='active gr'>所有商品</view>
						</template>
					</uni-list-item>
					<!-- 遍历商品分类 -->
					<uni-list-item @click='selectGroup(group)' clickable :key="group.id"
						v-for="group in mainStore.goodsGroup">
						<template v-slot:header>
							<view v-if='data.groupId===group.id' class='active gr'>{{group.name}}</view>
							<view v-else class='gr'>{{group.name}}</view>
						</template>
					</uni-list-item>
				</uni-list>
			</view>
		</uni-col>
		<!-- 右侧商品 -->
		<uni-col :span="17">


			<view v-if="data.goodsList.length>0" class="right_box">
				<!-- 商品列表 -->
				<view class='goods-item' v-for='g in data.goodsList' :key='g.id'>
					<uni-row class="demo-uni-row" >
						<!-- 商品图 -->
						<uni-col :span="10">
							<image class='goods-pic' :src="g.cover" @click='toGoodsDetail(g)'></image>
						</uni-col>
						<!-- 商品的价格和描述 -->
						<uni-col :span="10">
							<view class="info" @click='toGoodsDetail(g)'>
								<view class="g-title">{{g.title}}</view>

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
			<view v-else style="text-align: center;line-height: 100upx;">暂无商品</view>

		</uni-col>
	</uni-row>
</template>


<script setup>
	import {
		reactive,
		getCurrentInstance
	} from "vue";
	import { store } from "../../stores/index.js";
	import {
		onLoad
	} from "@dcloudio/uni-app"
	
	const mainStore = store();
	const {
		ctx,proxy
	} = getCurrentInstance()

	const data = reactive({
		goodsGroup:[],
		goodsList:[],
		// 选中的商品id
		groupId: null
	})

	// 点击商品分类
	const selectGroup = (group) => {
		// 判断点击的商品分类是否为none
		if (group) {
			data.groupId = group.id
		} else {
			data.groupId = null
		}
		getGoodsDatas()
	}
	// 点击跳转到商品详情页
	const toGoodsDetail = (goodsId) => {
		const url = `/pages/goods/detail?id=${goodsId}`
		uni.navigateTo({
			url: url
		})
	}
	
	//获取某类商品数据
	const getGoodsDatas = ()=> {
		const params = {}
		if (data.groupId) {
			params.groupId = data.groupId
		}
		proxy.$api.goods.getGoodsList(params).then(res=>{
			if (res.code === 200) {
				data.goodsList = res.data.goods
			}
		})
	}
	
	onLoad(() => {
		console.log("activeGroupId",mainStore.activeGroupId)
		data.groupId = mainStore.activeGroupId
		// 获取商品数据
		getGoodsDatas()
	})
	
</script>

<style scoped lang="scss">
	// 左侧盒子的样式
	.left_box {
		// height: calc(100vh - 190upx);
		height: 100vh;
		background: #fff;
		overflow-y: auto;
		overflow-x: hidden;

		.active {
			color: #00aa00;
			font-weight: bold;
			border-left: solid 5px #00aa00;

		}

		.gr {
			font-size: 24upx;
			padding-left: 20upx;
		}
	}

	// 右侧盒子的样式
	.right_box {
		// height: calc(100vh - 190upx);
		height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
	}

	// 单个商品的样式
	.goods-item {
		margin: 15upx;
		background: #fff;
		height: 200upx;
		border-radius: 20upx;

		// 商品图
		.goods-pic {
			width: 100%;
			height: 200upx;
			border-radius: 20upx;
		}

		// 商品文字信息
		.info {
			text-indent: 20upx;

			// 商品的标题
			.g-title {
				font-size: 28upx;
				height: 120upx;
				line-height: 70upx;
			}

			// 商品的价格
			.g-price {
				color: #ff557f;
				font-size: 30upx;
				height: 80upx;
				line-height: 60upx;
			}
		}

		// 购物车图标样式
		.cart-icon {
			width: 50px;
			text-align: center;
			line-height: 200upx;

			image {
				width: 20px;
				height: 20px;
				background: #ececec;
				border-radius: 50%;
			}
		}
	}
</style>