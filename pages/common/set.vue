<template>
	<view>
		<!-- 用户基本信息 -->
		<uni-list>
			<!-- 用户头像 -->
			<uni-list-item :rightText="mainStore.userInfo.username">
				<!-- 自定义 header -->
				<template v-slot:header>
					<uni-file-picker limit="1" :del-icon="false" disable-preview :imageStyles="data.imageStyles"
						file-mediatype="image" @select="select" @progress="progress" @success="success" @fail="fail">
						<image style="width: 100%;height: 100%;" :src="mainStore.userInfo.avatar"></image>
					</uni-file-picker>
				</template>
			</uni-list-item>
			<uni-list-item clickable @click="navTo('/pages/update/name')" showArrow title="昵称"
				:rightText="mainStore.userInfo.last_name" />
			<uni-list-item clickable @click="navTo('/pages/update/mobile')" showArrow title="手机"
				:rightText="mainStore.userInfo.mobile" />
			<uni-list-item clickable @click="navTo('/pages/update/email')" showArrow title="邮箱"
				:rightText="mainStore.userInfo.email" />
			<uni-list-item clickable @click="navTo('/pages/update/password')" showArrow title="修改密码" />
		</uni-list>
		<!-- 版本号 -->
		<uni-list class='m-t-10'>
			<uni-list-item title="版本" rightText="1.0.0" />
		</uni-list>
		<!-- 退出登录 -->
		<view class='m-t-10 logout'>
			<button @click='mainStore.logout' type="default">退出登录</button>
		</view>
	</view>
</template>


<script setup>
	import {
		reactive,
		getCurrentInstance
	} from "vue";
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		store
	} from "../../stores/index.js";
	const mainStore = store();
	const {
		ctx,
		proxy
	} = getCurrentInstance()
	const data = reactive({
		imageStyles: {
			width: 64,
			height: 64,
			border: {
				radius: '50%'
			}
		}

	})

	// 获取上传状态
	const select = (e) => {
		const tempFilePaths = e.tempFilePaths; //e是获取的图片源
		uni.uploadFile({
			url: 'http://localhost:8084/user/updateAvatar', //上传图片的后端接口
			filePath: tempFilePaths[0],
			name: 'file',
			formData:e.tempFiles[0],
			header: {
				"Authorization": 'Bearer ' + uni.getStorageSync('token')
			},
			success: (res) => {
				console.log("res",res)
				if (res.statusCode === 200) {
					console.log('文件上传成功')
					// 获取用户信息
					proxy.$api.user.getUserInfo().then(res=>{
						// 保存用户信息到pinia中
						mainStore.saveUserInfo(res.data.currentUser)
					})
				}
			}
		})
	}


	// 获取上传进度
	const progress = (e) => {
		console.log('上传进度：', e)
	}

	// 上传成功
	const success = (e) => {
		console.log('上传成功')
	}

	// 上传失败
	const fail = (e) => {
		console.log('上传失败：', e)
	}

	const navTo = (url) => {
		uni.navigateTo({
			url: url
		})
	}

	// onLoad((params) => {
	// 	data.userInfo = mainStore.userInfo
	// })
</script>


<style scoped lang="scss">
	.m-t-10 {
		margin-top: 10upx;
	}

	.logout {
		background-color: #fff;

		button {
			background: #55aa7f;
			color: #fff;
			height: 74upx;
			line-height: 74upx;
		}
	}
</style>