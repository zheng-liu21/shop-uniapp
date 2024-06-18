<template>
	<view class="container">
		<view class='main_box'>
			<!-- login字样 -->
			<view class='title'>LOGIN</view>
			<!-- 登录的表单 -->
			<view class="login_box">
				<uni-forms ref="loginRef" :rules="data.rules" v-model="data.loginForm">
					<uni-forms-item name="username">
						<uni-easyinput :styles="data.inputStyle" prefixIcon="person" v-model="data.loginForm.username"
							placeholder="请输入账号" />
					</uni-forms-item>
					<uni-forms-item name="password">
						<uni-easyinput :styles="data.inputStyle" prefixIcon="locked" type="password"
							v-model="data.loginForm.password" placeholder="请输入密码" />
					</uni-forms-item>
				</uni-forms>
				<button type="default" @click="clickLogin">登 录</button>

				<!-- 忘记密码 -->
				<view class='forget'>忘记密码?</view>
			</view>
			<!-- 没有账号，注册 -->
			<view class='resgister-section'>还没有账号？
				<text @click="toRegister">马上注册!</text>
			</view>


		</view>

	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		getCurrentInstance
	} from "vue";
	import { store } from "../../stores/index.js";
	
	const mainStore = store();

	const data = reactive({
		//输入框的样式
		inputStyle: {
			color: '#55aa00',
			borderColor: '#55aa00'
		},
		// 登录输入的表单
		loginForm: {
			username: "",
			password: ""
		},
		// 登录表单的校验规则
		rules: {
			username: {
				rules: [{
					required: true,
					errorMessage: '账号不能为空'
				}]
			},
			password: {
				rules: [{
					required: true,
					errorMessage: '密码不能为空'
				}]
			}
		},
	})


	const loginRef = ref(null)
	const {
		ctx,proxy
	} = getCurrentInstance()


	// 点击登录对登录表单输入的数据进行校验
	const clickLogin = () => {
		loginRef.value.validate((valid) => {
			if (!valid) {
				console.log("验证通过");
				// 发送登录的接口请求
				proxy.$api.user.login(data.loginForm).then(res=>{
					if(res.code == 200){
						// 弹出提示登录成功
						uni.showToast({
							title: '登录成',
							duration: 1000
						});
						// 保存用户的登录状态
						mainStore.saveLoginStatus(res.data)
						// 获取用户信息
						proxy.$api.user.getUserInfo().then(res=>{
							// 保存用户信息到pinia中
							mainStore.saveUserInfo(res.data.currentUser)
						})
						mainStore.loadData()
						
						// 页面跳转
						// 获取当前页面栈(历史访问的路由信息)数量
						const resPa = getCurrentPages()
						// 判断历史路由是否大于1
						if (resPa.length <= 1) {
							// 跳转到用户中心页面
							uni.switchTab({
								url: '/pages/user/user'
							})
						} else {
							// 返回上一级页面
							uni.navigateBack()
						}
					}
					
				})
			} else {
				console.log("验证失败");
			}
		});
	}

	const toRegister = () => {
		uni.navigateTo({
			url: '/pages/user/register'
		})
	}
</script>

<style scoped lang="scss">
	/* 页面主体内容 */
	.main_box {
		height: 100vh;
		width: 100vw;
		background: url('../../static/loginbj-1.jpg');
		background-size: cover;
	}

	.title {
		font-size: 140upx;
		color: #f8f8f8;
		position: relative;
		top: 300upx;
	}

	/* 登录的表单 */
	.login_box {
		position: relative;
		top: 500upx;
		margin: 0 40upx;

		// 登录按钮
		button {
			background: #55aa00;
			color: #fff;
			width: 100%;
			border-radius: 46upx;
		}

		// 忘记密码
		.forget {
			color: #55aa00;
			text-align: center;
			height: 100upx;
			line-height: 100upx;
		}
	}

	// 没有账号，跳转到注册
	.resgister-section {
		position: absolute;
		font-size: 32upx;
		bottom: 50upx;
		width: 100%;
		text-align: center;
		color: #505050;

		text {
			color: #55aa00;
		}
	}
</style>