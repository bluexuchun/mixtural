<template>
	<view class="mission_detail">
		<view class="mission_head">
			<view class="head_title">
				{{current_info.grade_title}}
			</view>
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
		<view class="mission_submit" @click="finishMission">
			提交任务
		</view>
	
		<!-- 任务规则 -->
		<view class="model_back" v-if="is_show">
			<view class="model">
				<view class="model_head">
					任务规则/步骤
					<image @click="showModel" class="icon_close" src="../../static/images/icon_close.png" mode="widthFix"></image>
				</view>
				<view class="model_content" style="max-height:600rpx;overflow: hidden;overflow-y: auto;">
					{{current_info.task_rules}}
					<view class="model_img" style="width:100%;padding:16rpx 0rpx;" v-for="(item,index) in rules_photo" :key="index">
						<image style="width:100%;" :src="item.image" mode="widthFix"></image>
					</view>
				</view>
				<view class="model_confirm" @click="showModel" style="margin:12rpx auto;">
					确定
				</view>
			</view>
		</view>
		
		<!-- 签到成功 -->
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
		
		<!-- 已签到过 -->
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
		
		<!-- 完成任务失败 -->
		<view class="model_back" v-if="finisherror">
			<view class="model">
				<view class="model_head">
					还不能完成任务噢
					<image @click="showfinishModel" class="icon_close" src="../../static/images/icon_close.png" mode="widthFix"></image>
				</view>
				<view class="model_content">
					<view class="content_head">
						您还差签到{{starnum - current_sign}}天
					</view>
				</view>
				<view class="model_word">
					明天继续来签到哦
					<view class="model_confirm" @click="showfinishModel">
						确定
					</view>
				</view>
			</view>
		</view>
		
		<!-- 二维码核销 -->
		<view class="model_back" v-if="finishcode">
			<view class="model">
				<view class="model_head">
					请等待店员或者商户端扫码核销
					<image @click="showfinishCodeModel" class="icon_close" src="../../static/images/icon_close.png" mode="widthFix"></image>
				</view>
				<view class="model_content">
					<image style="width:100%;" :src="ewmcode" mode="widthFix"></image>
				</view>
				<view class="model_word">
					<view class="model_confirm" @click="showfinishCodeModel">
						关闭
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
				starnum:0,
				is_show:false,
				current_sign:0,
				current_info:{},
				current_imgs:[],
				bid:0,
				signshow:false,
				signerror:false,
				finisherror:false,
				finishcode:false,
				ewmcode:'',
				rules_photo:[]
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
					this.current_sign = data.current_sign || 0
					this.current_info = data.current_info
					this.current_imgs = this.current_info.detail_photo ? JSON.parse(this.current_info.detail_photo) : []
					this.starnum = this.current_info.sign_time
					this.rules_photo = this.current_info.rules_photo ? JSON.parse(this.current_info.rules_photo) : []
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
			showfinishModel(){
				let isshow = this.finisherror
				if(isshow){
					this.finisherror = false
				}else{
					this.finisherror = true
				}
			},
			showfinishCodeModel(){
				let isshow = this.finishcode
				if(isshow){
					this.finishcode = false
				}else{
					this.finishcode = true
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
				// 判断用户是否签到已满
				let signall = this.starnum
				let signnum = this.current_sign
				if(signnum == signall){
					let response = await api.finishMission({
						uid:this.userInfo.uid,
						bid:this.bid
					})
					console.log(response)
					if(response.status == 1){
						// this.init()
						this.ewmcode = response.data
						this.finishcode = true
					}
				}else{
					this.finisherror = true
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
