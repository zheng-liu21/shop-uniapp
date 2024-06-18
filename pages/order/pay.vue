<template>
	<view class='pay_box' v-if='data.orderData'>
		<!-- 支付金额 -->
		<view class='amount'>
			<view class='title'>支付金额</view>
			<view class="money">￥{{data.orderData.amount.toFixed(2)}}</view>
		</view>

		<!-- 支付方式 -->
		<view class='pay_method'>
			<view class='m_box'>
				<!-- 支付图标图片 -->
				<image src="../../static/pay/zfbpay.png"></image>
				<!-- 文字描述 -->
				<view class='info'>
					<view class='title'>支付宝支付</view>
					<view class='desc'>推荐使用支付宝支付</view>
				</view>
				<!-- 选择框 -->
				<view class='btn'>
					<radio @click='selectMethod(1)' :checked='data.pay_method===1' value=1 color='#55aa7f' />
				</view>

			</view>
			<view class='m_box b-b'>
				<!-- 支付图标图片 -->
				<image src="../../static/pay/wxpay.png"></image>
				<!-- 文字描述 -->
				<view class='info'>
					<view class='title'>微信支付</view>
				</view>
				<!-- 选择框 -->
				<view class='btn'>
					<radio @click='selectMethod(2)' :checked='data.pay_method===2' value=2 color='#55aa7f' />
				</view>
			</view>
			<view class='m_box'>
				<!-- 支付图标图片 -->
				<image src="../../static/pay/ysfpay.png"></image>
				<!-- 文字描述 -->
				<view class='info'>
					<view class='title'>云闪付</view>
				</view>
				<!-- 选择框 -->
				<view class='btn'>
					<radio @click='selectMethod(3)' :checked='data.pay_method===3' value=3 color='#55aa7f' />
				</view>
			</view>


		</view>


		<!-- 支付按钮 -->
		<view class='pay_btn'>
			<button type="default" @click='clickPay'>确认支付</button>
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
		orderID: null,
		orderData: null,
		pay_method:1,
	})


	// 选择支付方式
	const selectMethod = (number) => {
		data.pay_method = number
	}

	//点击支付按钮
	const clickPay = () => {
		if(data.pay_method===1){
			// 调用支付宝支付接口
			// toAliapy()
		}else{
			// 调用微信支付或者云闪付接口(后端未实现)
			// 跳转到支付结果页面
			uni.navigateTo({
				url:`/pages/order/paysuccess?status=2`
			})
		}

	}
	
	// 跳转到支付宝支付页面
	// const toAliapy=()=>{
	// 	// 发送请求获取支付宝支付的url地址
	// 	const response = await this.$api.order.getAlipayUrl({
	// 		orderID:this.orderID
	// 	})
	// 	// 判断响应状态码
	// 	if(response.statusCode===200){
	// 		// 跳转到支付宝支付的url地址
	// 		window.location.href = response.data.pay_url
	// 	}
		
	// }
	
	
	// 获取该订单信息
	const getOrderData=()=> {
		proxy.$api.order.getOrderInfo({
			orderID: data.orderID
		}).then(res => {
			if (res.code === 200) {
				data.orderData = res.data.order
			}
		})
	}
	
	onLoad((item) => {
		// 保存订单的ID
		data.orderID = item.id
		// 获取订单数据
		getOrderData()
	})
</script>

<style scoped lang="scss">
	.pay_box {
		padding: 20upx 60upx;

	}

	// 支付金额
	.amount {
		text-align: center;
		margin: 100upx auto;

		.title {
			color: #909090;
		}

		.money {
			margin: 20upx;
			font-size: 60upx;
		}
	}

	// 支付方式
	.pay_method {
		.m_box {
			display: flex;
			height: 120upx;
			align-items: center;

			image {
				width: 80upx;
				height: 80upx;
			}

			.info {
				flex: 1;
				padding-left: 20upx;

				.title {
					font-size: 38upx;
				}

				.desc {
					color: #b2b2b2;
				}
			}
		}

		.b-b {
			border-top: solid 1upx #dddddd;
			border-bottom: solid 1upx #dddddd;
		}
	}

	// 支付按钮
	.pay_btn {
		margin-top: 100upx;

		button {
			height: 74upx;
			line-height: 74upx;
			background: #55aa7f;
			color: #fff;
		}
	}
</style>