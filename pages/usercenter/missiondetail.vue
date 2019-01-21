<template>
	<view class="mission_detail">
		<view class="mission_head">
			<view class="headava">
				<image class="img_ava" :src="userInfo.avatar"></image>
			</view>
			<view class="sign_btn">
				签
			</view>
			<view class="mission_rule" @click="showModel">
				任务规则/步骤
			</view>
		</view>
		<view class="mission_star">
			<view v-for="(star,index) in starnum" :key="index" class="star_item">
				<image class="star_img" src="../../static/images/usercenter/star.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="mission_starword">
			您已签到：{{isSign}}天
		</view>
		
		<!-- 任务详情描述 -->
		<view class="mission_ruledetail">
			<view class="mission_rulehead">
				任务详情描述
			</view>
			<view class="mission_rulecontent">
				1.任务详情描述任务详情描述任务详情描述<br>
				2.任务详情描述任务详情描述任务详情描述任务详情描述<br>
				3.任务详情描述任务详情描述任务详情描述<br>
			</view>
		</view>
		<view class="mission_submit">
			提交任务
		</view>
		
		<!-- 任务规则 -->
		<view class="model_back" v-if="is_show">
			<view class="model">
				<view class="model_head">
					任务规则/步骤
					<image @click="showModel" class="icon_close" src="../../static/images/icon_close.png" mode="widthFix"></image>
				</view>
				<view class="model_content">
					任务规则/步骤任务规则/步骤任务规则/步骤任务规则/步骤任务规则/步骤
				</view>
				<view class="model_confirm" @click="showModel">
					确定
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
				starnum:3,
				isSign:0,
				is_show:false
			};
		},
		methods:{
			async init(){
				console.log('123')
				console.log(this.userInfo)
			},
			showModel(){
				let isshow = this.is_show
				console.log(isshow)
				if(isshow){
					this.is_show = false
				}else{
					this.is_show = true
				}
				
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

<style lang="less" src="../../static/less/usercenter/missiondetail.less"></style>
