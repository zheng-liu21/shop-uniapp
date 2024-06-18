<template>
	<view class='up_box'>
		<uni-forms ref="baseForm" :modelValue="data.formData" :rules="data.rules">
			<uni-forms-item>
				<uni-easyinput prefixIcon="locked" type="password" v-model="data.formData.password"
					placeholder="请输入新密码" />
			</uni-forms-item>
			<uni-forms-item>
				<uni-easyinput prefixIcon="locked-filled" type="password" v-model="data.formData.password_confirmation"
					placeholder="再次输入新密码" />
			</uni-forms-item>

			<uni-forms-item>
				<uni-row class="demo-uni-row" :gutter='40'>
					<uni-col :span="12">
						<uni-easyinput prefixIcon="chat-filled" placeholder="请输入验证码" v-model="data.formData.code" />
					</uni-col>
					<uni-col :span="12">
						<button v-if='data.disable' size="mini" @click='sendMsg'>获取短信验证码</button>
						<button v-else class='dis' size="mini" @click='sendMsg'>{{data.count}}(s)可再次获取</button>
					</uni-col>
				</uni-row>

			</uni-forms-item>
		</uni-forms>
		<button @click='savePwd'>保存</button>


	</view>
</template>


<script setup>
	import {
		reactive,
		ref,
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
	
	const baseForm = ref(null)
	
	//提取把pinia中的用户信息
	onLoad(() => {
		data.formData.mobile=mainStore.userInfo.mobile
		data.formData.id=mainStore.userInfo.id
	})

	const data = reactive({
		formData: {
			code: "",
			id:"",
			password: "",
			password_confirmation: "",
			codeID: "",
			mobile: ""
		},
		// 发送验证码
		disable: true,
		count: 60,
	})


	// 保存
	const savePwd = () => {
		proxy.$api.user.savePwd(data.formData).then(res=>{
			if(res.code==200){
				uni.showToast({
					title: "保存成功!"
				})
				uni.navigateBack()
			}else{
				uni.showToast({
					title: res.message
				})
			}
			
		})

	}
	
	const sendMsg = () => {
		baseForm.value.validate((valid) => {
			if (!valid) {
				console.log("验证通过");
				// 禁用发送验证码的按钮
				data.disable = false
				data.count = 60
				// 使用定时器控制验证码发送的时间
				setInterval(() => {
					if (data.count === 0) {
						// 启用发送验证码的接口
						data.disable = true
						clearInterval()
					} else {
						data.count--
					}
				}, 1000)
				// 发送的接口请求
				proxy.$api.user.sendMsg(data.formData).then(res=>{
				
					uni.showToast({
						title: res.message
					})
				})
			} else {
				console.log("验证失败");
			}
		});
	}
</script>


<style scoped lang="scss">
	.up_box {
		margin: 40upx 10upx 20upx 10upx;

		button {
			background: #55aa7f;
			color: #fff;
			height: 74upx;
			line-height: 74upx;

		}

		.dis {
			background: #f4f4f4;
			color: #888888;
		}
	}
</style>