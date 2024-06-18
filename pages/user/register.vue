<template>
	<view class='main_box'>
		<!-- login字样 -->
		<view class='title'>REGISTER</view>
		<!-- 注册的表单 -->
		<view class="login_box">
			<uni-forms ref="regRef" :rules="data.rules" :model="data.regForm">
				<uni-forms-item name="username">
					<uni-easyinput :styles="inputStyle" prefixIcon="person" v-model="data.regForm.username"
						placeholder="请输入账号" />
				</uni-forms-item>
				<uni-forms-item name="email">
					<uni-easyinput :styles="inputStyle" prefixIcon="email" v-model="data.regForm.email"
						placeholder="请输入邮箱" />
				</uni-forms-item>
				<uni-forms-item name="password">
					<uni-easyinput :styles="inputStyle" prefixIcon="locked" type="password"
						v-model="data.regForm.password" placeholder="请输入密码" />
				</uni-forms-item>
				<uni-forms-item name="password_confirmation">
					<uni-easyinput :styles="inputStyle" prefixIcon="locked" type="password"
						v-model="data.regForm.password_confirmation" placeholder="再次确认密码" />
				</uni-forms-item>
			</uni-forms>
			<button type="default" @click="clickRegis">注 册</button>

		</view>


		<!-- 有账号，登录 -->
		<view class='resgister-section'>已有账号？
			<text @click="toLogin">马上登录!</text>
		</view>


	</view>
</template>


<script setup>
	import {
		reactive,
		ref
	} from "vue";


	const data = reactive({

		//输入框的样式
		inputStyle: {
			color: '#55aa00',
			borderColor: '#55aa00'
		},
		// 注册输入的表单
		regForm: {
			username: "",
			email: "",
			password: "",
			password_confirmation: ""
		},
		// 登录表单的校验规则
		rules: {
			username: {
				rules: [{
					required: true,
					errorMessage: '账号不能为空'
				}]
			},
			email: {
				rules: [{
					required: true,
					errorMessage: '邮箱不能为空'
				}]
			},
			password_confirmation: {
				rules: [{
					required: true,
					errorMessage: '确认密码不能为空'
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
	const regRef = ref(null)

	// 点击登录对登录表单输入的数据进行校验
	const clickRegis = () => {
		regRef.value.validate((valid) => {
			console.log("valid==="+valid)
			if (valid) {
				// 发送登录的接口请求
				// 弹出提示登录成功
				uni.showToast({
					title: '注册成功,1秒之后自动跳转到登录页面',
					duration: 1000
				});
				setTimeout(() => {
					// 页面跳转
					toLogin()
				}, 1000)
			}

		});
	}

	const toLogin = () => {
		uni.redirectTo({
			url: '/pages/user/login'
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
		bottom: 25upx;
		width: 100%;
		text-align: center;
		color: #505050;

		text {
			color: #55aa00;
		}
	}
</style>