<template>
	<div class="box">{{result}}</div>
</template>

<script>
	import is from 'is'
	import Utils from '@/utils/index'
	import api from '@/utils/api'
	import mixin from '@/utils/mixin'
	export default {
		mixins:[mixin],
		computed: {
		    userInfo() {
		        return this.$store.state.app.userInfo;
		    }
		},
		data() {
			return {
				type:0,
				id:0,
				result:''
			};
		},
		methods:{
			async init(){
				Utils.loading('正在处理中')
				if(this.type == 'add'){
					let addResult = await api.addMember({
						bid:this.id,
						uid:this.userInfo.uid
					})
					uni.setStorageSync("bid",this.id)
					if(addResult.status == 1){
						Utils.loaded()
						this.result = addResult.message
					}else{
						Utils.loaded()
						this.result = addResult.message
					}
				}else if(this.type == 'verf'){
					let submitResult = await api.submitMission({
						current_id:this.id,
						uid:this.userInfo.uid
					})
					console.log(submitResult)
					if(submitResult.status == 1){
						Utils.loaded()
						this.result = submitResult.message
					}else{
						Utils.loaded()
						this.result = submitResult.message
					}
				}
			}
		},
		onShow(){
			let _this = this
			if(!_this.shouldLogin){
				_this.init()
			}
		},
		onLoad(options){
			let type = options.type
			let id = options.id
			this.type = type
			this.id = id
		}
	}
</script>
	
<style>
	.box{
		width:100%;
		height:100vh;
		background: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size:30rpx;
	}
</style>
