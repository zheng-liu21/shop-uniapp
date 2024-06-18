<template>
	<view class='up_box'>
		<uni-forms ref="baseForm" :rules="data.rules" v-model="data.formData">
			<uni-forms-item>
				<uni-easyinput v-model="data.formData.last_name" placeholder="请输入昵称" />
			</uni-forms-item>
		</uni-forms>
		<button @click='saveName'>保存</button>


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
	const data = reactive({
		formData: {
			last_name: "",
			id:""
		},
		// 表单的校验规则
		rules: {
			last_name: {
				rules: [{
					required: true,
					errorMessage: '昵称不能为空'
				}]
			}
		}
	})
	const baseForm = ref(null)
	//提取把pinia中的用户信息
	onLoad(() => {
		data.formData.last_name=mainStore.userInfo.last_name
		data.formData.id=mainStore.userInfo.id
	})
	
	// 点击保存对登录表单输入的数据进行校验
	const saveName = () => {
		baseForm.value.validate((valid) => {
			console.log("valid",valid)
			if (!valid) {
				console.log("验证通过");
				// 发送登录的接口请求
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
