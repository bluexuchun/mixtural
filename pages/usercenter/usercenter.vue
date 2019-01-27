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
				</view>
			</view>
		</view>
		
		<!-- usermission -->
		<view class="user_mission" v-if="userInfo.identity == 1">
			<!-- progress -->
			<view class="user_progress">
				<view class="progress_word">
					<view class="progress_pword">
						当前任务进度：<view class="progress_num">20%</view>
					</view>
					<!-- <view class="progress_more" @click="navigateto('missiondetail')">
						查看详情
						<image class="more_icon" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
					</view> -->
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
					<view class="more_word" @click="navigateto('missiondetail')">
						查看奖励
					</view>
					<image class="more_icon" src="../../static/images/usercenter/more.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- vip -->
			<view class="user_vip">
				<view class="viplevel">
					VIP等级：vip1
				</view>
				<view class="vipdetail">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :duration="duration" @change="changeVip">
					    <swiper-item v-for="(item,itemindex) in vipawardlist" :key="itemindex">
					        <view class="vip-box">
								<view class="vipbox">
									<view class="vipbox-head">
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
				<view class="vipmore" @click="navigateto('vipdetail')">
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
				vipawardlist:[
					{
						id:1,
						title:'VIP1',
						desc:'VIP1的权益',
						current:true
					},
					{
						id:2,
						title:'VIP2',
						desc:'VIP2的权益',
						current:false
					},
					{
						id:3,
						title:'VIP3',
						desc:'VIP3的权益',
						current:false
					}
				],
				is_show:true,
			};
		},
		methods:{
			async init(){
				Utils.loading('正在加载')
				let response = await api.initIdentify({uid:this.userInfo.uid})
				console.log(response)
				
				if(response.status == 1){
					Utils.loaded()
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
				
			},
			navigateto(type){
				console.log(type)
				uni.navigateTo({
					url:type
				})
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
		}
	}
</script>

<style lang="less" src="../../static/less/usercenter/usercenter.less" scoped></style>
