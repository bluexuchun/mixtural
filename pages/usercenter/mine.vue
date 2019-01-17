<template>
	<view class="mine">
		<view class="mine_header">
			<view class="mine_header">
				<image class="mine_avatar" :src="userInfo.avatar" mode=""></image>
				<view class="mine_userinfo">
					{{userInfo.nickname}}
				</view>
			</view>
		</view>
		<view class="mine_lists">
			<view class="mine_item">
				<view class="item_left">
					个人资料
				</view>
				<view class="item_right">
					<image class="icon_more" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="mine_item">
				<view class="item_left">
					商家入驻
				</view>
				<view class="item_right">
					<image class="icon_more" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="mine_item">
				<view class="item_left">
					扫码核销
				</view>
				<view class="item_right">
					<image class="icon_more" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="mine_item">
				<view class="item_left">
					用户协议
				</view>
				<view class="item_right"></view>
					
			</view>
			<view class="mine_item">
				<view class="item_left">
					联系我们
				</view>
				<view class="item_right">
					<image class="icon_more" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
				</view>
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

<style lang="less" src="../../static/less/usercenter/mine.less"></style>
