<template>
	<view>
		<view class="" @click="getall">获取七天内得所有工作记录</view>
		<view class="" @click="getMsg">获取消息</view>
		<view class="" @click="getNoMsg">获取有没有未读消息</view>
		<view class="" @click="changePwd">修改密码</view>
		<view class="" @click="createTeam">创建团队</view>
		<view class="" @click="getMyTeam">获取我创建得团队</view>
		<view class="" @click="getTeamAll">获取所有得团队</view>
		<view class="" @click="searchUser">搜索用户</view>
		<view class="" @click="inviteJoin">邀请用户加入</view>
		<view class="" @click="participateTeam">我参与的团队</view>
		<view class="" @click="beInvited">被邀请记录</view>
		<view class="" @click="agreeInvited">同意一个邀请</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num:1,
				id:"5fb3414ff0fecf27bc912e4d"
			};
		},
		
		mounted() {
			this.getall();
		},
		methods:{
			async getall(){
				//all completed undone
				let obj = {type:'undone'};
				let res = await this.$Post('api/sevenDayWork',obj);
				console.log(res)
			},
			async getMsg(){
				let obj = {offset:2,limit:5};
				let res = await this.$Post('tsc/notice',obj);
				console.log(res)
			},
			async getNoMsg(){
				// let obj = {offset:1,limit:5};
				let res = await this.$Post('tsc/unread',{});
				console.log(res)
			},
			async changePwd(){
				let obj = {pwd:'1234567',newPwd:'12345678'}
				let res = await this.$Post('tsc/changePwd',obj);
				this.$Toast(res.data.message)
				console.log(res)
			},
			async createTeam(){
				let obj = {teamName:'test',expireDate:'2020-11-17',teamLabel:'666创建的团队',technologyLabel:['vue','react']};
			    let res = await this.$Post('tsc/createTeam',obj);
				this.$Toast(res.data.message)
				console.log(res)
			},
			async getMyTeam(){
				let obj = {userId:uni.getStorageSync('userinfo')._id,useranme:uni.getStorageSync('userinfo').useranme}
				let res = await this.$Post('tsc/myTeam',obj);
				this.$Toast(res.data.message)
				console.log(res)
			},
			async getTeamAll(){
				let obj = {offset:1,limit:3}
				let res = await this.$Post('tsc/teamAll',obj);
				this.$Toast(res.data.message)
				console.log(res);
			},
			async searchUser(){
				let obj = {text:'666'}
				let res = await this.$Post('tsc/searchUser',obj);
				this.$Toast(res.data.message)
				console.log(res);
			},
			async inviteJoin(){
				let obj =  {userId:'5faf4ffdd79066023cdaf37a',teamId:'9'};
				let res = await this.$Post('tsc/inviteJoin',obj);
				this.$Toast(res.data.message)
				console.log(res);
			},
			async participateTeam(){
				let obj =  {userId:'5fb3414ff0fecf27bc912e4d',teamId:'3'};
				let res = await this.$Post('tsc/participateTeam',obj);
				this.$Toast(res.data.message)
				console.log(res);
			},
			async beInvited(){
				let obj = {userId:uni.getStorageSync('userinfo')._id}
				let res = await this.$Post('tsc/beInvited',obj);
				this.$Toast(res.data.message)
				console.log(res);
			},
			async agreeInvited(){
				let obj = {id:'1',status:'1'};
			}
		}
	}
</script>

<style lang="scss">

</style>
