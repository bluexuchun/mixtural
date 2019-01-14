<template>
	<view class="usercenter">
		<!-- userheader -->
		<view class="user_header">
			<view class="settings">
				<image class="icon_setting" src="../../static/images/usercenter/setting.png" mode=""></image>
			</view>
			<view class="user_info">
				<view class="user_ava">
					<image class="icon_ava" :src="userInfo.avatar" mode=""></image>
				</view>
				<view class="user_infolist">
					<view class="user_name">
						{{userInfo.nickname}}
					</view>
				</view>
			</view>
		</view>
		
		<!-- usermission -->
		<view class="user_mission">
			<!-- progress -->
			<view class="user_progress">
				<view class="progress_word">
					当前任务进度：<view class="progress_num">20%</view>
				</view>
				<view class="progress_box">
					<view class="progress_line">
						
					</view>
				</view>
			</view>
			<!-- award -->
			<view class="user_award">
				<view class="award_word">
					当前任务奖励
				</view>
				<view class="award_more">
					<view class="more_word">
						查看奖励
					</view>
					<image class="more_icon" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- vip -->
			<view class="user_vip">
				<view class="viplevel">
					vip1
				</view>
				<view class="vipdetail">
					1：vip1的福利1<br>
					2：vip2的福利2<br>
					3：vip3的福利3<br>
				</view>
				<view class="vipmore">
					点击查看所有VIP等级与福利
					<image class="more_icon" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
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

<style lang="less" src="../../static/less/usercenter/usercenter.less" scoped></style>
