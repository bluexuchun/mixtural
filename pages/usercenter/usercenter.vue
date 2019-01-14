<template>
	<view class="usercenter">
		<view class="user_header">
			<view class="user_info">
				
			</view>
		</view>
	</view>
</template>

<script>
	import is from 'is'
	import Utils from 'utils'
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
				
			};
		},
		methods:{
			async init(){
				console.log('123')
				console.log(this.userInfo)
			}
		},
		onShow(){
			let _this = this
			if(!_this.shouldLogin){
				_this.init()
			}
		}
	}
</script>

<style lang="less" src="../../static/less/usercenter/usercenter.less" scoped></style>
