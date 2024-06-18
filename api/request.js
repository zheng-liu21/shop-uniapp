
const http = {
	//baseurl地址
	baseUrl: "http://127.0.0.1:8084",
	//请求方法
	request(config) {
		//config请求配置对象
		config = beforeRequest(config)
		config.url = this.baseUrl+config.url
		config.header['content-type'] = 'application/x-www-form-urlencoded'
		//创建一个Promise对象，发送请求
		return new Promise((resolve,reject) => {
			uni.request(config)
				.then(res => {
					const response = beforeResponse(res.data)
					resolve(response)
				})
				.catch(err =>{
					errorHandle(err)
					reject(err)
				})
		})	
	},
	
	get(url,data,auth){
		/**
		 * auth:请求是否需要携带token进行认证(true or false)
		 */
		return this.request({
			url: url,
			data: data,
			auth: auth,
			method: "GET"
		})
	},
	
	post(url,data,auth){
		return this.request({
			url: url,
			data: data,
			auth: auth,
			method: "POST"
		})
	},
	
	delete(url,auth){
		return this.request({
			url: url,
			auth: auth,
			method: "DELETE"
		})
	},
	
	put(url,data,auth){
		return this.request({
			url: url,
			data: data,
			auth: auth,
			method: "PUT"
		})
	}
}


//请求拦截器
const beforeRequest = (config) => {
	//请求之前的操作
	
	config.header = {}
	// 判断该接口请求是否需要携带token
	if(config.auth){
		if(uni.getStorageSync('token')){
			// 在请求头中添加token
			config.header['Authorization'] = 'Bearer '+ uni.getStorageSync('token')
		}else{
			// 没有登录，无访问权限，重定向到登录页面
			uni.navigateTo({
				url:'/pages/user/login'
			})
		}
	}
	console.log('请求拦截器：',config)
	return config
}


//响应拦截器
const beforeResponse = (response) => {
	//响应之前的操作
	console.log('响应拦截器：',response)
	
	// 判断请求返回的响应状态码是否为操作成功的。
	if(response.data.code!==200 ){
		// 给出对应的提示
		if (response.data.message){
			// 显示错误提示内容
			uni.showToast({
				title: response.data.message.toString(),
				duration: 1000,
				icon:"none",
			});
		}
	}
	return response
}
//异常处理器
const errorHandle = (err) =>{
	console.log('网络异常，请求失败',err)
}

export default http