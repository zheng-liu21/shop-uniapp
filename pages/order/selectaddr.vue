<template>
	<view>
		<!-- 默认收货地址 -->
		<view class="addr_box" v-if='mainStore.defaultAddr' @click='selectAddr(mainStore.defaultAddr.id)'>
			<view class='addr'>
				<text>{{mainStore.defaultAddr.province+mainStore.defaultAddr.city+mainStore.defaultAddr.county+mainStore.defaultAddr.address}}</text>
			</view>
			<view class='name'>
				<uni-tag text="默认" type="success" inverted />
				<text>{{mainStore.defaultAddr.name}}</text>
				<text>{{mainStore.defaultAddr.phone}}</text>
			</view>
		</view>
		<!-- 其他收货地址 -->
		<view class="addr_box" v-for='addr in mainStore.address' :key="addr.id" @click='selectAddr(addr.id)'>
			<view class='addr'>
				<text>{{addr.province+addr.city+addr.county+addr.address}}</text>
			</view>
			<view class='name'>
				<text>{{addr.name}}</text>
				<text>{{addr.phone}}</text>
			</view>
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
		defaultAddr: {
			id: 1,
			name: "zheng",
			phone: "18804088115",
			province: "河南省",
			city: "商丘市",
			county: "睢阳区",
			address: "名门城3期1606"
		},
		address: [{
				id: 2,
				name: "zheng",
				phone: "18804088115",
				province: "河南省",
				city: "商丘市",
				county: "睢阳区",
				address: "名门城3期1606"
			},
			{
				id: 3,
				name: "zheng",
				phone: "18804088115",
				province: "河南省",
				city: "商丘市",
				county: "睢阳区",
				address: "名门城3期1606"
			}
		]
	
	
	})
	
	// 选择收货地址，返回订单提交页面
	const selectAddr = (id) => {
		uni.redirectTo({
			url:`/pages/order/submit?id=${id}`
		})
	}
	
</script>

<style scoped lang="scss">
	// 地址栏显示的样式
	.addr_box {
		height: 130upx;
		background: #fff;
		margin-bottom: 4upx;
		padding: 10upx 20upx;

		// 地址样式
		.addr {
			height: 80upx;
			line-height: 80upx;
			font-size: 30upx;
		}

		// 名字和电话样式
		.name {
			height: 50upx;
			line-height: 50upx;
			color: #949494;
		}

		// 按钮样式
		.edit-btn {
			height: 130upx;
			line-height: 120upx;
		}

		
	}
</style>
