<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		
		<view class="" @click="upload">更新头像</view>
		<view class="" @click="uploadName">更改名字</view>
		<view class="" @click="login">登录</view>
		<view class="" @click="registered">注册</view>
		<view class="" @click="add">添加工作内容</view>
		<view class="" @click="get">获取当天得记录</view>
		<view class="" @click="getOther">获取其他天得记录</view>
		<!-- <view class="" @click="setMessage">修改某条数据为已完成</view> -->
		
		<view class="list" v-for="(item,index) in list" :key="index">
			<view>工作内容:{{item.workText}}</view>
			<view>创建时间:{{item.creatTime}}</view>
			<view>状态:
			<text v-if="item.type==='0'">未完成</text>
			<text v-if="item.type==='1'">已完成</text>
			</view>
			<view v-if="item.type==='1'">
				<text v-if="item.endType==='0'" style="color: red;">超出{{item.differenceTime}}分钟完成</text>
				<text v-if="item.endType==='1'" style="color: green;">提前{{item.differenceTime}}分钟完成</text>
			</view>
			<view class="" v-if="item.type==='0'" @click="set(item)">设为已完成</view>
			<view class=""  @click="Delete(item)">删除</view>
		</view>
		 <w-picker
		        :visible.sync="visible"
		        mode="date" 
		        startYear="2017" 
		        endYear="2029"
		        :value="key"
		        :current="true"
		        fields="day"
		        @confirm="onConfirm($event,'date')"
		        :disabled-after="false"
		        ref="date" 
		    ></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components:{wPicker},
		data() {
			return {
				title: 'Hello',
				img:'',
				visible:false,
				key:'',
				list:[]
			}
		},
		onLoad() {
			 let date = new Date();
			    let year = date.getFullYear();
			    let month = date.getMonth() + 1;
			    let day = date.getDate();
				// if(month*1<10){
				// 	month = '0'+month;
				// }
				// if(day*1<10){
				// 	day = '0'+day;
				// }
			    this.key = `${year}-${month}-${day}`;
				this.get();
		},
		methods: {
			time(date) {
			            var y = date.getFullYear()
			            var m = date.getMonth() + 1
			            // m = m < 10 ? '0' + m : m
			            var d = date.getDate()
			            // d = d < 10 ? '0' + d : d
			            var h = date.getHours()
			            h = h < 10 ? '0' + h : h
			            var minute = date.getMinutes()
			            minute = minute < 10 ? '0' + minute : minute
			            var second = date.getSeconds()
			            second = second < 10 ? '0' + second : second
			            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
			        },
			upload(){
				uni.chooseImage({
					success: (res) => {
						console.log(res)
						uni.uploadFile({
						           url: 'http://192.168.0.117:3000/api/upload', //仅为示例，非真实的接口地址
						           filePath: res.tempFilePaths[0],
						           name: 'file',
						           formData: {
						               'user': 'test'
						           },
						           success: async(uploadFileRes) => {
									   let obj = JSON.parse(uploadFileRes.data);
									   if(obj.code===200){
										   this.img = obj.filename;
										   console.log(this.img)
										   let dataObj = {avatar:this.img};
										   let res = await this.$Post('api/updateProfile',dataObj);
										   console.log(res)
										   this.$Toast(res.data.message);
									   }
						               console.log(uploadFileRes);
						           }
						       });
					}
				})
			},
			async login(){
				let obj = {username:'666',pwd:'123456'};
				let res = await this.$Post('api/login',obj)
				this.$Toast(res.data.message);
				if(res.data.code===200){
					uni.setStorageSync('userinfo',res.data.data.userinfo);
				}
				console.log(res)
			},
			async add(){
				let obj = {workText:'工作内容一',estimatedTime:'2'}
				// let obj = {};
				let res = await this.$Post('api/addWorkContent',obj);
				this.$Toast(res.data.message);
				console.log(res)
			},
			async get(){
				// let time = new Date(this.key).getTime();
				let obj = {time:this.key}
				let res = await this.$Post('api/workDay',obj);
				if(res.data.code===200){
					res.data.data.forEach((val,ind)=>{
						val.creatTime = this.time(new Date(val.creatTime))
					})
					this.list = res.data.data;
					this.$Toast(res.data.message);
				}
				console.log(res)
			},
			getOther(){
				this.visible = true;
			},
			async onConfirm(e){
				console.log(e)
				let time = `${e.obj.year}-${e.obj.month*1}-${e.obj.day*1}`
				let obj = {time:e.value}
				let res = await this.$Post('api/workDay',obj);
				this.$Toast(res.data.message);
				console.log(res)
			},
			async set(item){
				console.log(item);
				let obj = {id:item.id,time:item.time,remark:'测试测试测试'};
				let res = await this.$Post('api/setWork',obj);
				console.log(res)
				this.$Toast(res.data.message);
				if(res.data.code===200){
					this.get();
				}
			},
			async registered(){
				let obj = {username:'666',pwd:123456};
				let res = await this.$Post('api/registered',obj);
				this.$Toast(res.data.message);
				console.log(res)
			}, 
			async uploadName(){
				let obj = {username:'王五1'};
			    let res = await this.$Post('api/updateProfile',obj);
				console.log(res)
				this.$Toast(res.data.message)
			},
			async Delete(item){
				// console.log(item)
				let obj = {id:item.id,time:item.time};
				let res = await this.$Post('api/deleteWork',obj);
				console.log(res)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
