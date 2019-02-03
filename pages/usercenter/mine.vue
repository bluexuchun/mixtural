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
			<view class="mine_item" @click="navigateto('useredit')">
				<view class="item_left">
					<image src="../../static/images/usercenter/icon_user.png" mode="widthFix"></image>
					个人资料
				</view>
				<view class="item_right">
					<image class="icon_more" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="mine_item" @click="navigateto('usershop')">
				<view class="item_left">
					<image src="../../static/images/usercenter/icon_shop.png" mode="widthFix"></image>
					商家入驻
				</view>
				<view class="item_right">
					<image class="icon_more" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="mine_item">
				<view class="item_left">
					<image src="../../static/images/usercenter/icon_xy.png" mode="widthFix"></image>
					用户协议
				</view>
				<view class="item_right"></view>
					
			</view>
			<view class="mine_item" @click="contactUs()">
				<view class="item_left">
					<image src="../../static/images/usercenter/icon_contact.png" mode="widthFix"></image>
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
				
			};
		},
		methods:{
			async init(){
				console.log('123')
				console.log(this.userInfo)
			},
			navigateto(type){
				console.log(type)
				uni.navigateTo({
					url:type
				})
			},
			contactUs(){
				uni.makePhoneCall({
					phoneNumber: '114' //仅为示例
				});
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
