<template>
	<view class='up_box'>
		<uni-forms ref="baseForm" :rules="data.rules" v-model="data.formData">
			<uni-forms-item>
				<uni-easyinput prefixIcon="email" v-model="data.formData.email" placeholder="请输入邮箱" />
			</uni-forms-item>
		</uni-forms>
		<button @click='saveEmail'>保存</button>
	

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
	
	const data = reactive({
		formData:{
			id:"",
			email:""
		},
		// 表单的校验规则
		rules: {
			email: {
				rules: [{
					required: true,
					errorMessage: '邮箱不能为空'
				}]
			}
		}
	})
	
	//提取pinia中的用户信息
	onLoad(() => {
		data.formData.email=mainStore.userInfo.email
		data.formData.id=mainStore.userInfo.id
	})
	

	
	const saveEmail = () => {
		baseForm.value.validate((valid) => {
			console.log("valid",valid)
			if (!valid) {
				console.log("验证通过");
				// 更新用户的接口请求
				proxy.$api.user.updateUser(data.formData).then(res=>{
					if(res.code == 200){
						// 保存成功
						uni.showToast({
							title: "保存成功!"
						})
						
						// 获取用户信息
						proxy.$api.user.getUserInfo().then(res=>{
							// 保存用户信息到pinia中
							mainStore.saveUserInfo(res.data.currentUser)
						})
						// 跳转到上级页面
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					}
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
	}
</style>
