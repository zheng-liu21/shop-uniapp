<template>

	<view v-if='data.EditForm'>
		<view class="row">
			<view class="title">联系人</view>
			<input class="my-input" v-model='data.EditForm.name' placeholder="请输入联系人" />
		</view>
		<view class="row">
			<view class="title">电话：</view>
			<input class="my-input" v-model='data.EditForm.phone' placeholder="请输入电话" />
		</view>
		<view class="row">
			<view class="title">省份</view>
			<!-- 选择器组件 -->
			<picker class='sele' @change='proChange' :value='data.proIndex' :range='data.provinces' range-key='name'>
				<view class="select_box"> {{data.EditForm.province}}</view>
			</picker>
		</view>
		<view class="row">
			<view class="title">城市</view>
			<picker class='sele' @change='cityChange' :value='data.cityIndex' :range='data.citys' range-key='name'>
				<view class="select_box"> {{data.EditForm.city}}</view>
			</picker>
		</view>
		<view class="row">
			<view class="title">区县</view>
			<picker class='sele' @change='countyChange' :value='data.countyIndex' :range='data.countys' range-key='name'>
				<view class="select_box"> {{data.EditForm.county}}</view>
			</picker>
		</view>
		<view class="row">
			<view class="title">详细地址</view>
			<input class="my-input" v-model='data.EditForm.address' placeholder="请选择地址" />
		</view>


		<view class="row">
			<view class="title">设为默认</view>
			<view style="text-align: right; flex: 1;">
				<switch @change='switchDefault' :checked='data.EditForm.is_default' color="#55aa7f" />
			</view>
		</view>
		<view class="submit_btn">
			<button @click='updateAddr' type="default">提交</button>
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
	
	import { store } from "../../stores/index.js";
	
	const mainStore = store();

	const {
		ctx,proxy
	} = getCurrentInstance()
	
	const data = reactive({
		// 选中省份的索引
		proIndex: 0,
		// 保存所有的省份
		provinces: [],
		cityIndex: 0,
		// 省份下的市
		citys: [],
		countyIndex: 0,
		// 市下面的区县
		countys: [],
		EditForm: {},
		// 是否是添加地址的操作
		isAdd: true
	})

	// 修改是否默认的状态
	const switchDefault = () => {
		if(data.EditForm.is_default === 0){
			data.EditForm.is_default = 1
		}else{
			data.EditForm.is_default = 0
		}
		console.log("is_default",data.EditForm.is_default)
	}

	
	const updateAddr = () => {
		// 发送请求修改地址
		proxy.$api.user.updateAddress(data.EditForm).then(res=>{
			console.log("updateAddr",res)
			if (res.code === 200) {
				// 修改成功
				uni.showToast({
					title: "修改成功!"
				})
			}
			mainStore.getAddrList()
			// 跳转到上级页面
			setTimeout(() => {
				uni.navigateBack()
			}, 1000)
		})
	}

	// 获取所有省份的方法
	const getProvinceData = () => {
		proxy.$api.user.getProvince("中国").then(res=>{
			if (res.code === 200) {
				data.provinces = res.data.provinceList
			}
		})
	}
	
	// 获取选中省份下的所有市
	const getCityData = (params) => {
		proxy.$api.user.getCity(params).then(res=>{
			if (res.code === 200) {
				data.citys = res.data.cityList
				
				data.EditForm.city = data.citys[0]
				const params={
					countryName:"中国",
					provinceName:data.EditForm.province,
					city:data.EditForm.city
				}
				getCountyData(params)
			}
		})
	}
	
	//  获取选择市下面的所有区县
	const getCountyData = (params) => {
		proxy.$api.user.getCounty(params).then(res=>{
			if (res.code === 200) {
				data.countys = res.data.countyList
				data.EditForm.county = data.countys[0]
			}
		})
	}
	
	//  选中的省份发送变化
	const proChange = (item) => {
		// 更改选中省份的索引
		data.proIndex = item.detail.value
		data.EditForm.province = data.provinces[data.proIndex]
		const params={
			countryName:"中国",
			provinceName:data.EditForm.province
		}
		getCityData(params)
	}
	
	// 选中的城市发生变化
	const cityChange = (item) => {
		// 更改选中城市的索引
		data.cityIndex = item.detail.value
		data.EditForm.city = data.citys[data.cityIndex]
		const params={
			countryName:"中国",
			provinceName:data.EditForm.province,
			city:data.EditForm.city
		}
		getCountyData(params)
	}
	
	//选中的区县发生变化
	const countyChange = (item) => {
		data.countyIndex = item.detail.value
		data.EditForm.county = data.countys[data.countyIndex]
	}

	onLoad((params) => {
		// 判断是否是编辑操作
		if (params.id) {
			data.isAdd = false
			data.EditForm = mainStore.addrList.addressList.find(item => {
				return params.id == item.id
			})
		}
		// 获取所有省份的数据
		getProvinceData()
		const param={
			countryName:"中国",
			provinceName:data.EditForm.province
		}
		//获取所在省份的市
		getCityData(param)
		
	})
</script>


<style scoped lang="scss">
	.row {
		display: flex;
		height: 100upx;
		background: #fff;
		margin-bottom: 4upx;
		padding: 5upx 20upx;
		align-items: center;

		.title {
			font-size: 34upx;

		}

		.my-input {
			margin-left: 40upx;
		}

		.sele {
			flex: 1;
		}

		.select_box {
			font-size: 34upx;
			text-indent: 40upx;
		}
	}

	.submit_btn {
		position: fixed;
		width: 100%;
		bottom: 10upx;

		button {
			color: #fff;
			background: #55aa7f;
			height: 74upx;
			line-height: 74upx;
			margin: 0 10upx;
		}
	}
</style>