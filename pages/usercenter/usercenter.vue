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
					<view class="user_identify">
						身份: {{userInfo.identity == 1 ? '用户' : userInfo.identity == 2 ? '店员' : '商户'}}
					</view>
					<view class="user_identify">
						商家: {{business.business_title}}
					</view>
				</view>
			</view>
		</view>
		
		<!-- usermission -->
		<view class="user_mission" v-if="userInfo.identity == 1">
			<!-- progress -->
			<view class="user_progress">
				<view class="progress_word">
					<view class="progress_pword">
						当前签到进度：<view class="progress_num">{{currect_speed}}%</view>
					</view>
					<!-- <view class="progress_more" @click="navigateto('missiondetail')">
						查看详情
						<image class="more_icon" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
					</view> -->
				</view>
				<view class="progress_box">
					<view class="progress_line" :style="{width:currect_speed + '%'}">
						
					</view>
				</view>
			</view>
			<!-- award -->
			<view class="user_award">
				<view class="award_word">
					当前任务详情
				</view>
				<view class="award_more">
					<view class="more_word" @click="navigateto('missiondetail')">
						查看详情
					</view>
					<image class="more_icon" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- vip -->
			<view class="user_vip">
				<view class="viplevel">
					当前等级：{{currect_grade.grade_title}}
				</view>
				<view class="vipdetail">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :duration="duration" @change="changeVip">
					    <swiper-item v-for="(item,itemindex) in vipawardlist" :key="itemindex">
					        <view class="vip-box">
								<view class="vipbox">
									<image class="vipbox-bg" :src="item.bg" mode="widthFix"></image>
									<view class="vipbox-head">
										<image class="vipbox-logo" :src="item.photo" mode="widthFix"></image>
										{{item.title}}
									</view>
									<view class="vipbox-content">
										{{item.desc}}
									</view>
								</view>
							</view>
					    </swiper-item>
					</swiper>
				</view>
				<view class="vipmore" @click="navigateto('vipdetail',currect_grade.id)">
					点击查看所有VIP等级与福利
					<image class="more_icon" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		
		<!-- shoplist -->
		<view class="shop_list" v-else-if="userInfo.identity == 3">
			<view class="shop_item" @click="navigateto('usershop')">
				<view class="item_left">
					<image src="../../static/images/usercenter/icon_shop.png" mode="widthFix"></image>
					商家入驻
				</view>
				<view class="item_right">
					<image class="icon_more" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="shop_item" @click="navigateto('/pages/shop/member')">
				<view class="item_left">
					<image src="../../static/images/usercenter/icon_member.png" mode="widthFix"></image>
					店员列表
				</view>
				<view class="item_right">
					<image class="icon_more" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="shop_item" @click="navigateto('/pages/shop/level')">
				<view class="item_left">
					<image src="../../static/images/usercenter/icon_vip.png" mode="widthFix"></image>
					等级列表
				</view>
				<view class="item_right">
					<image class="icon_more" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="shop_item" @click="scanVerify()">
				<view class="item_left">
					<image src="../../static/images/usercenter/icon_scan.png" mode="widthFix"></image>
					扫码核销
				</view>
				<view class="item_right">
					<image class="icon_more" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		
		<!-- 签到提示 -->
		<view class="model_back" v-if="is_show">
			<view class="model">
				<view class="model_head">
					签到
					<image @click="showModel" class="icon_close" src="../../static/images/icon_close.png" mode="widthFix"></image>
				</view>
				<view class="model_content">
					<view class="content_head">
						您已连续签到{{currect_total}}天
					</view>
					<view class="content_sign">
						<view v-for="aindex in currect_total" class="sign_item sign_active">
							<view class="item_title">
								第{{aindex + 1}}天
							</view>
							<image class="item_icon" src="../../static/images/usercenter/gou.png" mode="widthFix"></image>
						</view>
						<view v-for="nindex in nosign" class="sign_item">
							<view class="item_title">
								第{{currect_total + nindex + 1}}天
							</view>
							<image class="item_icon" src="../../static/images/usercenter/star_active.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="model_word">
					明天继续保持噢
					<view class="model_confirm" @click="showModel">
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
	import Footer from '@/components/footer.vue'
	export default {
		mixins:[mixin],
		components:{
			'v-footer':Footer
		},
		computed: {
		    userInfo() {
		        return this.$store.state.app.userInfo;
		    }
		},
		data() {
			return {
				indicatorDots: false,
				autoplay: false,
				duration: 500,
				vipawardlist:[],
				is_show:true,
				bid:'',
				business:{},
				currect_grade:{},
				currect_speed:'',
				left_grade:'',
				currect_total:0,
				nosign:0
			};
		},
		methods:{
			async init(){
				Utils.loading('正在加载')
				let response = await api.initIdentify({uid:this.userInfo.uid})
				
				console.log(response)
				if(response.status == 1){
					Utils.loaded()
					console.log('123')
					let data = response.data;
					this.$store.commit('set_userInfo', data);
					this.userInfo = data
				}
				
				
				if(this.userInfo.identity == 1){
					if(!this.is_show){
						uni.showTabBar({
							
						})
						
					}else{
						uni.hideTabBar({
							
						})
					}
				}else{
					this.is_show = false
					uni.hideTabBar({
						
					})
				}
				
				// 获取首页的信息
				let data = {
					uid:this.userInfo.uid,
					bid:this.bid
				}
				let indexInfo = await api.getIndex(data)
				
				if(indexInfo.status == 1){
					this.business = indexInfo.data.business
					this.currect_grade = indexInfo.data.currect_grade
					this.vipawardlist[0] = {
						id:this.currect_grade.id,
						title:this.currect_grade.grade_title,
						desc:this.currect_grade.description,
						photo:this.currect_grade.grade_photo,
						bg:this.currect_grade.grade_bg,
						current:true
					}
					this.currect_speed = indexInfo.data.currect_speed
					this.left_grade = indexInfo.data.left_grade
					this.currect_total = indexInfo.data.currect_total
					this.nosign = this.currect_grade.sign_time - this.currect_total
				}else{
					Utils.toast(response.message)
				}
			},
			navigateto(type,params){
				if(params){
					uni.navigateTo({
						url:type+'?id='+params
					})
				}else{
					uni.navigateTo({
						url:type
					})
				}
			},
			changeVip(e) {
				let vipid = e.detail.current
				this.currenid = vipid
			},
			showModel(){
				let isshow = this.is_show
				if(isshow){
					this.is_show = false
					uni.showTabBar({
						
					})
				}else{
					this.is_show = true
				}
			},
			scanVerify(){
				uni.scanCode({
					onlyFromCamera: true,
					success:function(res){
						console.log(res)
					}
				})
			}
		},
		onShow(){
			let _this = this
			if(!_this.shouldLogin){
				_this.init()
			}
		},
		onLoad(options){
			// 拿到扫码的bid值
			let bid = options.bid
			bid = 2
			if(bid){
				this.bid = bid
				uni.setStorageSync("bid",bid)
			}else{
				Utils.toast('请扫码进入小程序')
			}
		}
	}
</script>

<style lang="less" src="../../static/less/usercenter/usercenter.less" scoped></style>
