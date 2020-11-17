var baseUrl = 'http://192.168.0.117:3000/';
// var baseUrl = 'http://106.55.59.24:3000/';
export let $Get=(url,data)=>{
		return new Promise((resolve,reject)=>{
			uni.request({
				method:'GET',
				url:baseUrl+url,
				data,
				success:(res)=>{
					if(res.data.code==401){
						setTimeout(()=>{
							uni.reLaunch({
								url:'/pages/login/login'
							})
						},500)
					}
					resolve(res);
				},fail:(err)=>{
					console.log(err);
					reject(err)
				}
			})
		})
}
// console.log(this.baseUrl)

export let $login=(url,data)=>{
	// console.log(res)
		return new Promise((resolve,reject)=>{
			uni.request({
				method:'POST',
				url:baseUrl+url,
				data,
				header:{
					'content-type':'application/x-www-form-urlencoded'},
				success:(res)=>{
					// console.log(res)
					if(res.data.code==401){
						setTimeout(()=>{
							uni.reLaunch({
								url:'/pages/login/login'
							})
						},500)
					}
					resolve(res);
				},fail:(err)=>{
					// console.log(err);
					reject(err)
				}
			})
		})
}

export let $Post=(url,data)=>{
	let res = uni.getStorageSync('userinfo');
	// console.log(res)
		return new Promise((resolve,reject)=>{
			uni.request({
				method:'POST',
				url:baseUrl+url,
				data,
				header:{
					'content-type':'application/x-www-form-urlencoded',
					'Authorization':res.token},
				success:(res)=>{
					// console.log(res)
					if(res.data.code==401){
						setTimeout(()=>{
							uni.reLaunch({
								url:'/pages/login/login'
							})
						},500)
					}
					resolve(res);
				},fail:(err)=>{
					// console.log(err);
					reject(err)
				}
			})
		})
}




export let $Toast = (title)=>{
	uni.showToast({
		icon:'none',
		title
	})
}