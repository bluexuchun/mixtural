<template>
	<view class="mission_detail">
		<view class="mission_head">
			<view class="headava">
				<image class="img_ava" :src="userInfo.avatar"></image>
			</view>
			<view class="sign_btn" @click="actionSign">
				签
			</view>
			<view class="mission_rule" @click="showModel">
				任务规则/步骤
			</view>
		</view>
		<view class="mission_star">
			<view v-for="(item,idx) in current_sign" :key="idx" class="star_item">
				<image class="star_img" src="../../static/images/usercenter/star_active.png" mode="widthFix"></image>
			</view>
			<view v-for="(star,index) in starnum - current_sign" :key="index" class="star_item">
				<image class="star_img" src="../../static/images/usercenter/star.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="mission_starword">
			您已签到：{{current_sign}}天
		</view>
		
		<!-- 任务详情描述 -->
		<view class="mission_ruledetail">
			<view class="mission_rulehead">
				任务详情描述
			</view>
			<view class="mission_rulecontent">
				{{current_info.detail}}
			</view>
			<view class="mission_ruleimg" v-for="(item,index) in current_imgs" :key="index">
				<image :src="item.image" class="ruleimg" mode="widthFix"></image>
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
		
		<view class="model_back" v-if="signshow">
			<view class="model">
				<view class="model_head">
					签到成功
					<image @click="showSignModel" class="icon_close" src="../../static/images/icon_close.png" mode="widthFix"></image>
				</view>
				<view class="model_content">
					<view class="content_head">
						您已连续签到{{current_sign}}天
					</view>
				</view>
				<view class="model_word">
					明天继续保持噢
					<view class="model_confirm" @click="showSignModel">
						确定
					</view>
				</view>
			</view>
		</view>
		
		<view class="model_back" v-if="signerror">
			<view class="model">
				<view class="model_head">
					你今天已经签到过啦
					<image @click="showerrorModel" class="icon_close" src="../../static/images/icon_close.png" mode="widthFix"></image>
				</view>
				<view class="model_content">
					<view class="content_head">
						您已连续签到{{current_sign}}天
					</view>
				</view>
				<view class="model_word">
					明天继续来签到哦
					<view class="model_confirm" @click="showerrorModel">
						确定
					</view>
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
				is_show:false,
				current_sign:0,
				current_info:{},
				current_imgs:[],
				bid:0,
				signshow:false,
				signerror:false
			};
		},
		methods:{
			async init(){
				let bid = uni.getStorageSync("bid")
				this.bid = bid
				Utils.loading('正在加载')
				let missionDetail = await api.getMission({
					uid:this.userInfo.uid,
					bid:bid
				})
				if(missionDetail.status == 1){
					Utils.loaded()
					let data = missionDetail.data
					this.current_sign = data.current_sign
					this.current_info = data.current_info
					this.current_imgs = this.current_info.detail_photo ? JSON.parse(this.current_info.detail_photo) : []
				}
			},
			showModel(){
				let isshow = this.is_show
				if(isshow){
					this.is_show = false
				}else{
					this.is_show = true
				}
			},
			showSignModel(){
				let isshow = this.signshow
				if(isshow){
					this.signshow = false
				}else{
					this.signshow = true
				}
			},
			showerrorModel(){
				let isshow = this.signerror
				if(isshow){
					this.signerror = false
				}else{
					this.signerror = true
				}
			},
			// 签到
			async actionSign(){
				let actionResult = await api.actionSign({
					uid:this.userInfo.uid,
					bid:this.bid
				})
				if(actionResult.status == 1){
					this.current_sign = actionResult.data
					this.signshow = true
				}else{
					this.signerror = true;
				}
			},
			// 提交任务
			async finishMission(){
				
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
